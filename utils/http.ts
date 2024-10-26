import { RedirectStatus, STATUS_CODE } from "$std/http/status.ts";

export function redirect(
  location: string,
  status: typeof STATUS_CODE.Created | RedirectStatus = STATUS_CODE.SeeOther,
) {
  return new Response(null, {
    headers: {
      location,
    },
    status,
  });
}

export function getCursor(url: URL) {
  return url.searchParams.get("cursor") ?? "";
}

export async function fetchValues<T>(endpoint: string, cursor: string) {
  let url = endpoint;
  if (cursor !== "") url += "?cursor=" + cursor;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Request failed: GET ${url}`);
  return await resp.json() as { values: T[]; cursor: string };
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestError";
  }
}