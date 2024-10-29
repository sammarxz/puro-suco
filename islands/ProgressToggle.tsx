import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import confetti from "npm:canvas-confetti";

import { completedLessonsSignal } from "@/utils/signals.ts";
import { dispatchProgressUpdate } from "@/utils/content/events.ts";

interface ProgressToggleProps {
  initialComplete: boolean;
  userId: string;
  moduleSlug: string;
  postSlug: string;
}

function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#84cc16", "#4ade80", "#22c55e"], // cores em tons de verde
    disableForReducedMotion: true, // acessibilidade
  });
}

export function ProgressToggle(props: ProgressToggleProps) {
  const lessonKey = `${props.moduleSlug}/${props.postSlug}`;
  const localComplete = useSignal(props.initialComplete);

  useEffect(() => {
    localComplete.value = props.initialComplete;

    completedLessonsSignal.value = {
      ...completedLessonsSignal.value,
      [lessonKey]: props.initialComplete,
    };
  }, [props.moduleSlug, props.postSlug, props.initialComplete]);

  async function toggleProgress() {
    if (!IS_BROWSER) return;

    const newState = !localComplete.value;
    const endpoint = `/api/progress/${props.moduleSlug}/${props.postSlug}`;
    const method = localComplete.value ? "DELETE" : "POST";

    try {
      const response = await fetch(endpoint, { method });
      if (response.ok) {
        localComplete.value = newState;

        // Se está marcando como completo, dispara o confetti
        if (newState) {
          fireConfetti();
        }

        completedLessonsSignal.value = {
          ...completedLessonsSignal.value,
          [lessonKey]: newState,
        };

        const progressResponse = await fetch("/api/progress");
        const progress = await progressResponse.json();

        dispatchProgressUpdate({
          completed: progress.totalCompleted,
          total: progress.totalPosts,
          moduleSlug: props.moduleSlug,
          postSlug: props.postSlug,
          isComplete: newState,
        });
      }
    } catch (error) {
      console.error("Failed to toggle progress:", error);
      localComplete.value = !newState;
    }
  }

  return (
    <button
      onClick={toggleProgress}
      disabled={!IS_BROWSER}
      class={`w-full px-4 py-2 border border-black/10 rounded-lg font-semibold transition-colors ${
        localComplete.value
          ? "bg-lime-200 text-lime-700 hover:bg-lime-300"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {localComplete.value ? "Completo ✓" : "Marcar como completo"}
    </button>
  );
}
