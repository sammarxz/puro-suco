import type { Post } from "@/utils/content/posts.ts";

interface PostNavigationProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav class="flex items-center justify-between border-t border-gray-200 py-8 mt-8">
      {prevPost
        ? (
          <a
            href={`/${prevPost.moduleSlug}/${prevPost.slug}`}
            class="group flex flex-col items-start"
          >
            <span class="text-sm text-gray-500 mb-1">Anterior</span>
            <span class="text-lg font-medium text-gray-900 group-hover:text-lime-500">
              {prevPost.title}
            </span>
          </a>
        )
        : (
          <div /> // Espaçador quando não há post anterior
        )}

      {nextPost && (
        <a
          href={`/${nextPost.moduleSlug}/${nextPost.slug}`}
          class="group flex flex-col items-end text-right"
        >
          <span class="text-sm text-gray-500 mb-1">Próximo</span>
          <span class="text-lg font-medium text-gray-900 group-hover:text-lime-500">
            {nextPost.title}
          </span>
        </a>
      )}
    </nav>
  );
}
