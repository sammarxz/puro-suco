import { signal } from '@preact/signals';

export interface LessonCompletion {
  key: string;
  completed: boolean;
}

// Signal para controlar o estado de conclusão das lições
export const completedLessonsSignal = signal<Record<string, boolean>>({});