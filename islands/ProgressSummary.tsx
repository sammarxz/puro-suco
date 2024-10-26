interface ProgressSummaryProps {
  completed: number;
  total: number;
  completedModules: number;
  totalModules: number;
  estimatedMinutesPerLesson?: number;
}

export function ProgressSummary({
  completed,
  total,
  completedModules,
  totalModules,
  estimatedMinutesPerLesson = 30,
}: ProgressSummaryProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const calculateTimeRemaining = (completed: number, total: number): string => {
    const remaining = total - completed;
    const totalMinutes = remaining * estimatedMinutesPerLesson;

    if (totalMinutes === 0) return "Concluído!";
    if (totalMinutes < 60) return `${totalMinutes}min restantes`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `~${hours}h restantes`;
    return `~${hours}h ${minutes}min restantes`;
  };

  const timeRemaining = calculateTimeRemaining(completed, total);

  return (
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm text-gray-500">Progresso Total</h3>
        <div class="mt-2 flex items-baseline space-x-2">
          <p class="text-2xl font-bold">{percentage}%</p>
          <p class="text-sm text-gray-500">concluído</p>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm text-gray-500">Aulas Completas</h3>
        <div class="mt-2 flex items-baseline space-x-2">
          <p class="text-2xl font-bold">{completed}</p>
          <p class="text-sm text-gray-500">de {total}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm text-gray-500">Módulos Completos</h3>
        <div class="mt-2 flex items-baseline space-x-2">
          <p class="text-2xl font-bold">{completedModules}</p>
          <p class="text-sm text-gray-500">de {totalModules}</p>
        </div>
      </div>
    </div>
  );
}
