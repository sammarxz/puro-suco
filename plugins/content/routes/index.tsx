import { defineRoute } from "$fresh/server.ts";
import { getPosts, type Module, type Post } from "../utils/posts.ts";
import Head from "../../../components/Head.tsx";

function PostCard(props: Post) {
  return (
    <div class="py-4">
      <a
        href={`/conteudos/${encodeURIComponent(props.moduleSlug)}/${
          encodeURIComponent(props.slug)
        }`}
      >
        <h3 class="text-xl font-bold">
          {props.title}
        </h3>
        {props.publishedAt.toString() !== "Invalid Date" && (
          <time
            dateTime={props.publishedAt.toISOString()}
            class="text-gray-500"
          >
            {props.publishedAt.toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </time>
        )}
        <div class="mt-2">
          {props.summary}
        </div>
      </a>
    </div>
  );
}

function ModuleSection(props: Module) {
  return (
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">{props.name}</h2>
      <div class="pl-4 divide-y">
        {props.posts.map((post) => <PostCard {...post} />)}
      </div>
    </section>
  );
}

export default defineRoute(async (_req, ctx) => {
  const modules = await getPosts();
  return (
    <>
      <Head title="Blog" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <h1 class="heading-with-margin-styles">Blog</h1>
        <div class="space-y-8">
          {modules.map((module) => <ModuleSection {...module} />)}
        </div>
      </main>
    </>
  );
});
