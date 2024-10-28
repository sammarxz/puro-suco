import {signal} from '@preact/signals'

export interface CompletionUpdate {
  moduleSlug: string;
  postSlug: string;
  isComplete: boolean;
}

export const completionSignal = signal<CompletionUpdate | null>(null);
