import type { Post } from "@/utils/content/posts.ts";
import { Check } from "@/components/Icons.tsx";

interface LessonItemProps {
  post: Post;
  moduleSlug: string;
  isActive: boolean;
  isCompleted: boolean;
}

export function LessonItem(
  { post, moduleSlug, isActive, isCompleted }: LessonItemProps,
) {
  return (
    <li class="my-2 block">
      <a
        href={`/${moduleSlug}/${post.slug}`}
        class={`
          group
          block py-2 px-3 text-sm rounded-md
          transition-all duration-200
          ${isActive ? "bg-amber-50" : "hover:bg-amber-50"}
        `}
      >
        <div class="flex items-center justify-between gap-2">
          <span
            class={`
              transition-colors duration-200
              ${
              isActive
                ? "text-amber-400 font-medium"
                : isCompleted
                ? "text-gray-400"
                : "text-gray-600 group-hover:text-gray-900"
            }
            `}
          >
            {post.title}
          </span>
          {isCompleted && (
            <span
              class="text-amber-400 transform transition-transform duration-200"
              title="Lição concluída"
            >
              <Check className="transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            </span>
          )}
        </div>
      </a>
    </li>
  );
}
