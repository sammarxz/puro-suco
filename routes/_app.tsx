import type { State } from "../../plugins/session.ts";
import { defineApp } from "$fresh/server.ts";

import { Navbar } from "../components/Navbar.tsx";

export default defineApp<State>((_, ctx) => {
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
          <Navbar
            url={ctx.url}
            sessionUser={ctx.state?.sessionUser}
          />
          <ctx.Component />
        </div>
      </body>
    </html>
  );
});
