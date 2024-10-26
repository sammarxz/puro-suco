import { Post } from "../utils/posts.ts";

export function PostCard(props: Post & { isComplete?: boolean }) {
  return (
    <div class="py-4">
      <a
        href={`/conteudos/${encodeURIComponent(props.moduleSlug)}/${
          encodeURIComponent(props.slug)
        }`}
        class="flex items-center space-x-3"
      >
        <div
          class={`w-2 h-2 rounded-full ${
            props.isComplete ? "bg-green-500" : "bg-gray-300"
          }`}
        />
        <div class="flex-1">
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
        </div>
      </a>
    </div>
  );
}
