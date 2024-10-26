import { defineRoute } from "$fresh/server.ts";
import { GitHubAvatarImg } from "../../components/GithubAvatarImage.tsx";

import type { SignedInState } from "../../plugins/session.ts";

export default defineRoute<SignedInState>((_req, ctx) => {
  const { sessionUser } = ctx.state;
  const action = sessionUser.isSubscribed ? "Manage" : "Upgrade";

  return (
    <main class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center gap-8">
      <GitHubAvatarImg
        login={sessionUser.login}
        size={240}
        class="mx-auto"
      />
      <h1 class="text-2xl font-bold">Minha conta</h1>
      <p class="text-lg">
        Olá, {sessionUser.login}! Você está logado com o Github.
      </p>
      <a
        href="/signout?success_url=/"
        class="button-styles block text-center"
      >
        Sair
      </a>
    </main>
  );
});
