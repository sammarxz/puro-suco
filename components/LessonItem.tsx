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
    <li class="my-2 block group">
      <a
        href={`/${moduleSlug}/${post.slug}`}
        class={`
          block py-2 px-3 text-sm rounded-md transition-all duration-200
          ${
          isActive
            ? "text-amber-400 bg-amber-50 font-medium"
            : "text-gray-600 hover:bg-amber-50 hover:text-gray-900"
        }
        `}
      >
        <div class="flex items-center justify-between gap-2">
          <span class={isCompleted ? "text-gray-400" : "text-gray-900"}>
            {post.title}
          </span>
          {isCompleted && (
            <span
              class="group text-amber-400 transform transition-transform duration-200 group-hover:scale-110"
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
