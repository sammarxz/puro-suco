import type { State } from "@/plugins/session.ts";
import { defineApp } from "$fresh/server.ts";
import { GoogleAnalytics } from "@/components/GoogleAnalytics.tsx";
import { GA_MEASUREMENT_ID } from "@/utils/config.ts";

export default defineApp<State>((_, ctx) => {
  return (
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="preload"
          href="/fonts/FixelVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <ctx.Component />
        <GoogleAnalytics
          measurementId={GA_MEASUREMENT_ID}
          disabled={Deno.env.get("DENO_ENV") === "development"}
        />
      </body>
    </html>
  );
});
