import { type PageProps } from "$fresh/server.ts";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/brand-github.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>UI design na prática</title>

        <link rel="stylesheet" href="/fonts/font-face.css" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="relative flex flex-col items-center justify-center bg-[#fffefc]">
          <nav class="sticky z-[100] w-11/12 p-4 opacity-100 sm:w-auto top-3 sm:top-4">
            <div class="mx-auto z-30 flex max-w-4xl items-center justify-between sm:space-x-10 rounded-full shadow-sm bg-white/50 backdrop-blur-md p-1.5 ring-1 ring-zinc-300/50">
              <a
                aria-current="page"
                href="/"
                class="router-link-active router-link-exact-active z-30 inline-flex items-center justify-center font-serif text-lg font-medium"
              >
                <div class="mr-2 rounded-full bg-black h-8 w-8" />
              </a>
              <div class="z-30 hidden gap-2 font-serif header-links text-zinc-400 md:inline-flex">
                <a href="/" class="aria-[current]:text-zinc-900">
                  Início
                </a>
                <a href="/posts" class="aria-[current]:text-zinc-900">Posts</a>
              </div>
              <a
                href="/city-guide/bangkok"
                class="disabled:opacity-50 font-medium transition inline-flex gap-2 items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-zinc-700/75 focus:ring-zinc-600 bg-black text-white hover:bg-zinc-900 hover:border-zinc-700 px-4 py-1.5 text-sm !rounded-full"
              >
                <IconBrandGithub class="w-5 h-5" /> Entrar com o Github{" "}
                <span class="ml-1.5 text-base i-ion-arrow-forward-outline">
                </span>
              </a>
            </div>
          </nav>
          <Component />
        </div>
      </body>
    </html>
  );
}
