import type { State } from "@/plugins/session.ts";

import { ModuleList } from "@/components/ModuleList.tsx";
import { Button } from "../components/Button.tsx";
import Head from "../components/Head.tsx";

export default function Home({ state }: State) {
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
          {!state.sessionUser
            ? (
              <>
                <Button as="a" href="/signin">
                  <svg
                    height="20"
                    width="20"
                    viewBox="0 0 16 16"
                    version="1.1"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      fill-rule="evenodd"
                      fill="currentColor"
                    >
                    </path>
                  </svg>Continue com Github
                </Button>
                <p class="text-sm text-gray-500">
                  Entre para salvar seu progresso e receber as novidades!
                </p>
              </>
            )
            : (
              <Button as="a" href="/conteudos">
                <span>Começar a aprender</span>
                <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                </div>
              </Button>
            )}
        </div>
      </div>
    </>
  );
}
