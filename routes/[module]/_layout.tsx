import type { FreshContext } from "$fresh/server.ts";

import { getPosts, Module } from "@/utils/content/posts.ts";
import { ProgressBar } from "@/islands/ProgressBar.tsx";
import { calculateTotalProgress } from "@/utils/content/progress.ts";
import { getAllModulesProgress } from "@/utils/db.ts";
import type { State } from "@/plugins/session.ts";

interface DocSidebarProps {
  currentModule?: string;
  currentSlug?: string;
  modules: Module[];
}

function DocSidebar(
  { currentModule, currentSlug, modules }: DocSidebarProps,
) {
  return (
    <aside class="flex-shrink-0 hidden md:block h-full">
      <nav class="h-full overflow-y-auto p-4">
        <div class="space-y-6">
          {modules.map((module) => (
            <div key={module.slug} class="space-y-2">
              <span class="font-medium">{module.name}</span>

              <ul class="pl-4 space-y-1">
                {module.posts.map((post) => (
                  <li key={post.slug}>
                    <a
                      href={`/${module.slug}/${post.slug}`}
                      class={`
                        block py-2 px-3 text-sm rounded-md
                        ${
                        currentModule === module.slug &&
                          currentSlug === post.slug
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                      `}
                    >
                      <div class="flex items-center justify-between">
                        <span>{post.title}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function DocHeader({ user }: { user?: { login: string } }) {
  return (
    <header class="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div class="h-16 flex items-center justify-between px-4">
        <div class="flex items-center">
          <a href="/" class="text-xl font-bold">UI Design na prática</a>
        </div>

        <div class="flex items-center gap-4">
          {user
            ? (
              <>
                <span class="text-sm text-gray-600">{user.login}</span>
                <a
                  href="/signout"
                  class="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sair
                </a>
              </>
            )
            : (
              <a
                href="/signin"
                class="text-sm text-gray-600 hover:text-gray-900"
              >
                Entrar
              </a>
            )}
        </div>
      </div>
    </header>
  );
}

export default async function ContentLayout(
  _req: Request,
  ctx: FreshContext<State>,
) {
  const modules = await getPosts();

  const currentPath = ctx.url.pathname;
  const pathParts = currentPath.split("/");
  const currentModule = pathParts[1];
  const currentSlug = pathParts[2];

  let modulesProgress = {};
  if (ctx.state.sessionUser) {
    modulesProgress = await getAllModulesProgress(ctx.state.sessionUser.login);
  }

  const progress = calculateTotalProgress(modules, modulesProgress);

  return (
    <div class="min-h-screen bg-white">
      {/* <DocHeader /> */}

      <div class="flex h-[calc(100vh-4rem)]">
        <div class="space-y-8 w-64 border-r border-gray-200">
          <ProgressBar
            initialCompleted={progress.totalCompleted}
            initialTotal={progress.totalPosts}
          />
          <DocSidebar
            currentModule={currentModule}
            currentSlug={currentSlug}
            modules={modules}
          />
        </div>

        <main class="flex-1 overflow-y-auto">
          <ctx.Component />
        </main>
      </div>
    </div>
  );
}
