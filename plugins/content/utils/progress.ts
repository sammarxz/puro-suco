import { Module } from "./posts.ts";
import { ModuleProgress } from "@/utils/db.ts";

interface TotalProgress {
  totalCompleted: number;
  totalPosts: number;
  completedModules: number;
  totalModules: number;
}

export function calculateTotalProgress(
  modules: Module[],
  modulesProgress: Record<string, ModuleProgress>
): TotalProgress {
  let totalCompleted = 0;
  let totalPosts = 0;
  let completedModules = 0;

  modules.forEach((module) => {
    // Conta total de posts
    const modulePostCount = module.posts.length;
    totalPosts += modulePostCount;

    // Pega o progresso do módulo se existir
    const progress = modulesProgress[module.slug];
    if (progress) {
      totalCompleted += progress.completedPosts;
      if (progress.completedPosts === modulePostCount) {
        completedModules++;
      }
    }
  });

  return {
    totalCompleted,
    totalPosts,
    completedModules,
    totalModules: modules.length
  };
}
