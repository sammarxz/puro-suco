export const PROGRESS_UPDATE_EVENT = "progressUpdate";

export interface ProgressUpdateDetail {
  // Informações do progresso geral
  completed: number;
  total: number;

  // Informações da lição específica
  moduleSlug: string;
  postSlug: string;
  isComplete: boolean;

}

export function dispatchProgressUpdate(detail: ProgressUpdateDetail) {
  const event = new CustomEvent<ProgressUpdateDetail>(PROGRESS_UPDATE_EVENT, {
    detail,
    bubbles: true,
  });

  dispatchEvent(event);
}
