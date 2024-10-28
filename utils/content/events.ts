export const PROGRESS_UPDATE_EVENT = "progressUpdate";

export interface ProgressUpdateDetail {
  completed: number;
  total: number;
}

export function dispatchProgressUpdate(detail: ProgressUpdateDetail) {
  const event = new CustomEvent<ProgressUpdateDetail>(PROGRESS_UPDATE_EVENT, {
    detail,
  });

  console.log(event)

  dispatchEvent(event);
}
