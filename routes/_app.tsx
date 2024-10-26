import type { State } from "@/plugins/session.ts";
import { defineApp } from "$fresh/server.ts";

export default defineApp<State>((_, ctx) => {
  return (
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/fonts/font-face.css" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <ctx.Component />
      </body>
    </html>
  );
});
