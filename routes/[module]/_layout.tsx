import type { FreshContext } from "$fresh/server.ts";

import { getPosts } from "@/utils/content/posts.ts";
import { calculateTotalProgress } from "@/utils/content/progress.ts";
import { getAllModulesProgress, isPostComplete } from "@/utils/db.ts";
import type { State } from "@/plugins/session.ts";
import Header from "@/components/Header.tsx";
import { ProgressOrLogin } from "@/components/ProgressOrLogin.tsx";
import { ContentSidebar } from "@/islands/ContentSidebar.tsx";

export default async function ContentLayout(
  _req: Request,
  ctx: FreshContext<State>,
) {
  const modules = await getPosts();

  const currentPath = ctx.url.pathname;
  const pathParts = currentPath.split("/");
  const currentModule = pathParts[1];
  const currentSlug = pathParts[2];

  const completedLessons: Record<string, boolean> = {};

  let modulesProgress = {};

  if (ctx.state.sessionUser) {
    modulesProgress = await getAllModulesProgress(
      ctx.state.sessionUser.login,
    );

    // Para cada módulo, verificar as lições completadas
    for (const module of modules) {
      for (const post of module.posts) {
        const isComplete = await isPostComplete(
          ctx.state.sessionUser.login,
          module.slug,
          post.slug,
        );
        if (isComplete) {
          completedLessons[`${module.slug}/${post.slug}`] = true;
        }
      }
    }
  }

  const progress = calculateTotalProgress(modules, modulesProgress);

  return (
    <div class="flex flex-col min-h-screen mx-auto max-w-screen-2xl">
      <Header title="docs" active="/docs" />
      <div class="flex">
        <div class="max-w-xs space-y-8 w-fit">
          {/* Mobile Sidebar */}
          <div class="lg:hidden">
            <input
              type="checkbox"
              class="hidden toggle"
              id="docs_sidebar"
              autocomplete="off"
            />
            <div class="fixed inset-0 z-50 hidden toggled">
              <label
                class="absolute inset-0 bg-gray-600 opacity-75"
                for="docs_sidebar"
              />
              <div class="relative flex-1 flex flex-col w-[18rem] h-full bg-white border-r-2 border-gray-100">
                <nav class="pt-0 pb-16 overflow-x-auto">
                  <div class="flex-1 h-screen overflow-y-auto pt-4 px-4">
                    <div>
                      <ProgressOrLogin
                        isLoggedIn={!!ctx.state.sessionUser}
                        initialCompleted={progress.totalCompleted}
                        initialTotal={progress.totalPosts}
                      />
                    </div>
                    <ContentSidebar
                      currentModule={currentModule}
                      currentSlug={currentSlug}
                      modules={modules}
                      completedLessons={completedLessons}
                    />
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div class="flex mx-auto max-w-screen-2xl px-0 md:px-4 md:py-0 justify-start bg-gray-100">
            <label
              for="docs_sidebar"
              class="px-4 py-3 lg:hidden flex items-center hover:bg-gray-100 rounded gap-2 cursor-pointer"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                >
                </path>
              </svg>
              <div>Table of Contents</div>
            </label>
          </div>

          {/* Desktop Sidebar */}
          <nav class="flex-shrink-0 hidden lg:block lg:px-4 bg-white">
            <div class="fixed top-24 w-[17rem] flex flex-col overflow-hidden">
              <h1 class="text-2xl max-w-[200px]">O Puro Suco do UI design</h1>
              <div class="flex-1 h-[calc(100vh_-_6rem)] overflow-y-auto pb-8">
                <div class="mt-4">
                  <ProgressOrLogin
                    isLoggedIn={!!ctx.state.sessionUser}
                    initialCompleted={progress.totalCompleted}
                    initialTotal={progress.totalPosts}
                  />
                </div>
                <ContentSidebar
                  currentModule={currentModule}
                  currentSlug={currentSlug}
                  modules={modules}
                  completedLessons={completedLessons}
                />
              </div>
            </div>
          </nav>
        </div>
        <ctx.Component />
      </div>
    </div>
  );
}
