import { defineRoute } from "$fresh/server.ts";

import type { State } from "@/plugins/session.ts";

import { ModuleList } from "@/components/ModuleList.tsx";
import { Button } from "@/components/Button.tsx";
import { ArrowRight, GitHub } from "@/components/Icons.tsx";

import Head from "@/components/Head.tsx";

export default defineRoute<State>((_req, ctx) => {
  const isSignedIn = ctx.state.sessionUser !== undefined;

  return (
    <>
      <Head href={"/"} />
      <div class="max-w-2xl w-14/16 px-6 mx-auto flex flex-col items-center justify-center min-h-screen">
        <header class="w-full space-y-3">
          <img
            src="/logo-symbol.svg"
            alt="Puro Suco logo"
            class="w-8 mb-8"
          />
          <h1 class="text-5xl font-bold">
            Aprenda design de interfaces na prática
          </h1>
          <p class="text-lg text-gray-500">
            Guia de aprendizagem para se tornar um designer de interface de
            usuário na prática{" "}
            <strong class="text-default">desde o básico</strong> até a{" "}
            <strong class="text-default">criação de projetos</strong>.
          </p>
        </header>

        <ModuleList />

        <div class="w-full mt-12 flex flex-col md:flex-row md:items-center gap-6">
          {!isSignedIn
            ? (
              <>
                <Button as="a" href="/signin">
                  <GitHub />
                  Continue com Github
                </Button>
                <p class="text-sm text-gray-500">
                  Entre para salvar seu progresso e receber as novidades!
                </p>
              </>
            )
            : (
              <Button as="a" href="/01-basico/01-introducao">
                <span>Começar a aprender</span>
                <ArrowRight />
              </Button>
            )}
        </div>
      </div>
    </>
  );
});
