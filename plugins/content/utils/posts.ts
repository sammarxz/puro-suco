import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/join.ts";
import { walk } from "$std/fs/walk.ts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  summary: string;
  module: string;
  moduleSlug: string;
}

export interface Module {
  name: string;
  slug: string;
  posts: Post[];
}

// Função auxiliar para converter nome do módulo para slug
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres especiais por hífen
    .replace(/^-+|-+$/g, ""); // Remove hífens do início e fim
}

// Função auxiliar para converter slug para nome do módulo
function fromSlug(slug: string): string {
  const moduleDir = Deno.readDirSync("./content")
    .find(dir => toSlug(dir.name) === slug);
  
  return moduleDir ? moduleDir.name : slug;
}

export async function getPost(moduleSlug: string, slug: string): Promise<Post | null> {
  try {
    // Encontra o diretório real do módulo baseado no slug
    const actualModuleName = fromSlug(moduleSlug);
    
    const text = await Deno.readTextFile(
      join("./content", actualModuleName, `${slug}.md`)
    );
    
    const { attrs, body } = extract<Omit<Post, "slug" | "module" | "moduleSlug">>(text);
    
    // Remove números e traços do início do nome do módulo
    const moduleName = actualModuleName.replace(/^\d+\s*-\s*/, "");
    
    return {
      ...attrs,
      slug,
      moduleSlug: toSlug(actualModuleName),
      module: moduleName,
      content: body,
    };
  } catch (error) {
    console.error("Error loading post:", error);
    return null;
  }
}

export async function getPosts(): Promise<Module[]> {
  const modules = new Map<string, Module>();

  try {
    // Walk through the content directory
    for await (const entry of walk("./content", {
      includeFiles: true,
      includeDirs: true,
      maxDepth: 2, // Limita a profundidade da busca
      followSymlinks: false,
    })) {
      if (entry.isFile && entry.path.endsWith(".md")) {
        const pathParts = entry.path.split("/");
        const moduleName = pathParts[pathParts.length - 2];
        const moduleSlug = toSlug(moduleName);
        const fileName = pathParts[pathParts.length - 1];
        const slug = fileName.replace(".md", "");

        const post = await getPost(moduleSlug, slug);
        if (post) {
          if (!modules.has(moduleSlug)) {
            modules.set(moduleSlug, {
              name: moduleName.replace(/^\d+\s*-\s*/, ""),
              slug: moduleSlug,
              posts: [],
            });
          }
          modules.get(moduleSlug)!.posts.push(post);
        }
      }
    }

    // Sort posts within each module by date
    return Array.from(modules.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(module => ({
        ...module,
        posts: module.posts.sort((a, b) => 
          b.publishedAt.getTime() - a.publishedAt.getTime()
        ),
      }));
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}