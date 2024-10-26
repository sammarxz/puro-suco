import type { Plugin } from "$fresh/server.ts";
import {
  createGitHubOAuthConfig,
  createHelpers,
} from "jsr:@deno/kv-oauth";

import { getGitHubUser } from "../utils/github.ts";
import { createUser, getUser, User } from "../utils/db.ts";
import { updateUserSession } from '../utils/db.ts';

export const oauth2Client = createGitHubOAuthConfig();
const { signIn, handleCallback, signOut, getSessionId, } = createHelpers(
  oauth2Client,
);

export { getSessionId }

export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/signin",
      async handler(req) {
        return await signIn(req);
      },
    },
    {
      path: "/callback",
      async handler(req) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response, tokens, sessionId } = await handleCallback(
          req
        );
        // console.log(tokens)
        // console.log(sessionId)
        // console.log(response)

        const githubUser = await getGitHubUser(tokens.accessToken);
        const user = await getUser(githubUser.login);

        if (user === null) {
          const user: User = {
            login: githubUser.login,
            sessionId,
            isSubscribed: false,
          }

          await createUser(user);
        } else {
          await updateUserSession(user, sessionId)
        }

        return response;
      },
    },
    {
      path: "/signout",
      async handler(req) {
        return await signOut(req);
      },
    },
    {
      path: "/protected",
      async handler(req) {
        return await getSessionId(req) === undefined
          ? new Response("Unauthorized", { status: 401 })
          : new Response("You are allowed");
      },
    },
  ],
} as Plugin;
