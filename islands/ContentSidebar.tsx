import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Module } from "@/utils/content/posts.ts";
import { completedLessonsSignal } from "@/utils/signals.ts";
import { Check } from "@/components/Icons.tsx";
import { useActiveRoute } from "@/hooks/useActiveRoute.ts";

interface ContentSidebarProps {
  currentModule?: string;
  currentSlug?: string;
  modules: Module[];
  completedLessons?: Record<string, boolean>;
}

export function ContentSidebar({
  currentModule,
  currentSlug,
  modules,
  completedLessons = {},
}: ContentSidebarProps) {
  const { activeModule, activeSlug, setActive } = useActiveRoute(
    currentModule,
    currentSlug,
  );

  // Inicializar o signal com os dados iniciais
  useEffect(() => {
    completedLessonsSignal.value = completedLessons;
  }, []);

  return (
    <>
      {modules.map((module) => (
        <div key={module.slug} class="space-y-2 mt-6">
          <span class="text-gray-900 font-semibold">
            {module.name}
          </span>

          <ul class="list-inside font-semibold nested">
            {module.posts.map((post) => {
              const isActive = activeModule.value === module.slug &&
                activeSlug.value === post.slug;
              const lessonKey = `${module.slug}/${post.slug}`;
              const isCompleted = completedLessonsSignal.value[lessonKey];

              return (
                <li key={post.slug} class="my-2 block">
                  <a
                    href={`/${module.slug}/${post.slug}`}
                    onClick={() => setActive(module.slug, post.slug)}
                    class={`
                      group block py-2 px-3 text-sm rounded-md
                      transition-all duration-200
                      text-gray-600 hover:bg-gray-50 hover:text-gray-900
                      aria-[current]:text-lime-700 aria-[current]:font-medium aria-[current]:bg-lime-50
                    `}
                  >
                    <div class="flex items-center justify-between gap-2">
                      <span>
                        {post.title}
                      </span>
                      {isCompleted && (
                        <span
                          class="text-lime-400 transform transition-transform duration-200"
                          title="Lição concluída"
                        >
                          <Check className="transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
