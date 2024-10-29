// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { Plugin } from "$fresh/server.ts";
import type { FreshContext } from "$fresh/server.ts";
import { getUserBySession } from "../utils/db.ts";
import type { User } from "../utils/db.ts";
import { UnauthorizedError } from "../utils/http.ts";
import { getSessionId } from "./kv_oauth.ts";

export interface State {
  sessionUser?: User;
}

export type SignedInState = Required<State>;

export function assertSignedIn(
  ctx: { state: State },
): asserts ctx is { state: SignedInState } {
  if (ctx.state.sessionUser === undefined) {
    throw new UnauthorizedError("User must be signed in");
  }
}

async function setSessionState(
  req: Request,
  ctx: FreshContext<State>,
) {
  if (ctx.destination !== "route") return await ctx.next();

  // Initial state
  ctx.state.sessionUser = undefined;

  const sessionId = await getSessionId(req);
  if (sessionId === undefined) return await ctx.next();
  const user = await getUserBySession(sessionId);
  if (user === null) return await ctx.next();

  ctx.state.sessionUser = user;

  return await ctx.next();
}

async function ensureSignedIn(
  _req: Request,
  ctx: FreshContext<State>,
) {
  assertSignedIn(ctx);
  return await ctx.next();
}


export default {
  name: "session",
  middlewares: [
    {
      path: "/",
      middleware: { handler: setSessionState },
    },
    {
      path: "/account",
      middleware: { handler: ensureSignedIn },
    },
  ],
} as Plugin<State>;