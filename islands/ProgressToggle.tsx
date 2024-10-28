import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { dispatchProgressUpdate } from "@/utils/content/events.ts";

interface ProgressToggleProps {
  initialComplete: boolean;
  userId: string;
  moduleSlug: string;
  postSlug: string;
}

export function ProgressToggle(props: ProgressToggleProps) {
  const isComplete = useSignal(props.initialComplete);

  async function toggleProgress() {
    if (!IS_BROWSER) return;

    const endpoint = `/api/progress/${props.moduleSlug}/${props.postSlug}`;
    const method = isComplete.value ? "DELETE" : "POST";

    try {
      const response = await fetch(endpoint, { method });
      if (response.ok) {
        isComplete.value = !isComplete.value;

        // Buscar progresso atualizado
        const progressResponse = await fetch("/api/progress");
        const progress = await progressResponse.json();

        // Disparar evento com o novo progresso
        dispatchProgressUpdate({
          completed: progress.totalCompleted,
          total: progress.totalPosts,
        });
      }
    } catch (error) {
      console.error("Failed to toggle progress:", error);
    }
  }

  return (
    <button
      onClick={toggleProgress}
      disabled={!IS_BROWSER}
      class={`px-4 py-2 rounded-full transition-colors ${
        isComplete.value
          ? "bg-lime-500 text-white hover:bg-lime-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isComplete.value ? "Completo ✓" : "Marcar como completo"}
    </button>
  );
}
