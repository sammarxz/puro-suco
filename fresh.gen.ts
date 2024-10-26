// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $account_index from "./routes/account/index.tsx";
import * as $api_progress_module_slug_ from "./routes/api/progress/[module]/[slug].ts";
import * as $index from "./routes/index.tsx";
import * as $ProgressToggle from "./islands/ProgressToggle.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/account/index.tsx": $account_index,
    "./routes/api/progress/[module]/[slug].ts": $api_progress_module_slug_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/ProgressToggle.tsx": $ProgressToggle,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
