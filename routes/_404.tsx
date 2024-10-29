import { Head } from "$fresh/runtime.ts";
import { Button } from "@/components/Button.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>Página não encontrada ▲ O Puro Suco do UI Design</title>
      </Head>
      <div class="max-w-2xl w-14/16 px-6 mx-auto flex flex-col items-center justify-center min-h-screen">
        <header class="w-full space-y-3">
          <img
            src="/logo-symbol.svg"
            alt="Puro Suco logo"
            class="w-8 mb-8"
          />
          <h1 class="text-5xl font-bold">
            Ops! Página não encontrada
          </h1>
          <p class="text-lg text-gray-500">
            Parece que você tentou acessar uma página que não existe.{" "}
            <strong class="text-default">Não se preocupe</strong>, você pode
            voltar para a <strong class="text-default">página inicial</strong>
            {" "}
            ou explorar nossos conteúdos.
          </p>
        </header>

        <div class="w-full mt-12 flex flex-col md:flex-row md:items-center gap-6">
          <Button as="a" href="/">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
            >
              <path
                d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
              </path>
            </svg>
            Voltar para o início
          </Button>
          <Button as="a" href="/01-basico/01-introducao" variant="outline">
            <span>Explorar conteúdos</span>
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
        </div>

        <div class="mt-16 text-center">
          <p class="text-sm text-gray-400">
            Erro 404 - Página não encontrada
          </p>
        </div>
      </div>
    </>
  );
}
