import { defineRoute } from "$fresh/server.ts";
import { getPosts } from "../utils/posts.ts";
import { getAllModulesProgress } from "@/utils/db.ts";

import Head from "@/components/Head.tsx";
import { ProgressBar } from "@/islands/ProgressBar.tsx";
import { ProgressSummary } from "@/islands/ProgressSummary.tsx";
import { calculateTotalProgress } from "../utils/progress.ts";
import { ModuleSection } from "../components/ModuleSection.tsx";

export default defineRoute<State>(async (_req, ctx) => {
  const modules = await getPosts();

  // Obtém o progresso apenas se o usuário estiver autenticado
  let modulesProgress = {};
  if (ctx.state.sessionUser) {
    modulesProgress = await getAllModulesProgress(ctx.state.sessionUser.login);
  }

  // Calcula o progresso total
  const { totalCompleted, totalPosts } = calculateTotalProgress(
    modules,
    modulesProgress,
  );

  const progress = calculateTotalProgress(modules, modulesProgress);

  return (
    <>
      <Head title="Conteúdos" href={ctx.url.href} />
      <main class="p-4 flex-1">
        {ctx.state.sessionUser
          ? (
            <div class="mb-8 space-y-6">
              <ProgressSummary
                completed={progress.totalCompleted}
                total={progress.totalPosts}
                completedModules={progress.completedModules}
                totalModules={progress.totalModules}
              />

              <div class="bg-white rounded-lg p-4 shadow-sm">
                <ProgressBar
                  completed={progress.totalCompleted}
                  total={progress.totalPosts}
                  showCelebration
                  showTimeEstimate
                  labels={{
                    completed: "aulas completas",
                    of: "de",
                    remaining: "restantes",
                    complete: "Você completou todas as aulas! 🎓",
                  }}
                />
              </div>
            </div>
          )
          : (
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p class="text-blue-800">
                <a href="/signin" class="underline">Faça login</a>{" "}
                para acompanhar seu progresso nos conteúdos
              </p>
            </div>
          )}

        <div class="space-y-8">
          {modules.map((module) => (
            <ModuleSection
              {...module}
              progress={modulesProgress[module.slug]}
            />
          ))}
        </div>
      </main>
    </>
  );
});
