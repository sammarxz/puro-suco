import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
  /** Tempo estimado em minutos por lição */
  estimatedMinutesPerLesson?: number;
  /** Se deve mostrar a celebração ao completar */
  showCelebration?: boolean;
  /** Se deve mostrar o tempo estimado */
  showTimeEstimate?: boolean;
  /** Labels customizados */
  labels?: {
    completed?: string;
    of?: string;
    remaining?: string;
    complete?: string;
  };
}

export function ProgressBar({
  completed,
  total,
  className = "",
  estimatedMinutesPerLesson = 30,
  showCelebration = true,
  showTimeEstimate = true,
  labels = {
    completed: "completos",
    of: "de",
    remaining: "restantes",
    complete: "Módulo completo!",
  },
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = percentage === 100;
  const progressRef = useRef<HTMLDivElement>(null);

  // Função para determinar a cor baseada no progresso
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  // Calcula o tempo restante estimado
  const calculateTimeRemaining = (completed: number, total: number): string => {
    const remaining = total - completed;
    const totalMinutes = remaining * estimatedMinutesPerLesson;

    if (totalMinutes === 0) return "";
    if (totalMinutes < 60) return `${totalMinutes}min ${labels.remaining}`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `~${hours}h ${labels.remaining}`;
    return `~${hours}h ${minutes}min ${labels.remaining}`;
  };

  // Efeito para animação ao montar
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.width = `${percentage}%`;
        }
      }, 100);
    }
  }, []);

  return (
    <div
      class={`w-full ${className}`}
      title={`${completed} ${labels.of} ${total} ${labels.completed}`}
    >
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <div class="flex items-center space-x-4">
          <span>
            {completed} {labels.of} {total} {labels.completed}
          </span>
          {showTimeEstimate && !isComplete && (
            <span class="text-gray-400">
              {calculateTimeRemaining(completed, total)}
            </span>
          )}
        </div>
        <span class="font-medium">{percentage}%</span>
      </div>

      <div class="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          ref={progressRef}
          class={`${
            getProgressColor(percentage)
          } h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ width: "0%" }}
        />
      </div>

      {showCelebration && isComplete && (
        <div class="flex items-center justify-center space-x-2 mt-2 text-green-500 text-sm">
          <span>🎉</span>
          <span>{labels.complete}</span>
          <span>🎉</span>
        </div>
      )}
    </div>
  );
}
