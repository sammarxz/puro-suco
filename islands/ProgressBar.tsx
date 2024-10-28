import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import {
  PROGRESS_UPDATE_EVENT,
  type ProgressUpdateDetail,
} from "@/utils/content/events.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ProgressBarProps {
  initialCompleted: number;
  initialTotal: number;
  className?: string;
}

export function ProgressBar({
  initialCompleted,
  initialTotal,
  className = "",
}: ProgressBarProps) {
  const completed = useSignal(initialCompleted);
  const total = useSignal(initialTotal);

  useEffect(() => {
    if (!IS_BROWSER) return;

    function handleProgressUpdate(event: CustomEvent<ProgressUpdateDetail>) {
      completed.value = event.detail.completed;
      total.value = event.detail.total;
    }

    addEventListener(
      PROGRESS_UPDATE_EVENT,
      handleProgressUpdate as EventListener,
    );

    return () => {
      removeEventListener(
        PROGRESS_UPDATE_EVENT,
        handleProgressUpdate as EventListener,
      );
    };
  }, []);

  const percentage = total.value > 0
    ? Math.round((completed.value / total.value) * 100)
    : 0;

  return (
    <div
      class={`w-full ${className} py-4`}
      title={`${completed.value} de ${total.value} aulas completas`}
    >
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <div class="flex items-center space-x-4">
          <span>
            {completed.value} de {total.value} aulas completas
          </span>
        </div>
        <span class="font-medium">{percentage}%</span>
      </div>

      <div class="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          class={`bg-amber-400 h-full rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
