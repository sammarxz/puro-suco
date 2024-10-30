import { getPosts } from "@/utils/content/posts.ts";
import { warmContentCache } from "@/utils/cache.ts";

async function main() {
  const posts = await getPosts();
  await warmContentCache(posts.flatMap(module => module.posts));
}

if (import.meta.main) {
  main()
    .then(() => Deno.exit(0))
    .catch((error) => {
      console.error("Failed to warm cache:", error);
      Deno.exit(1);
    });
}