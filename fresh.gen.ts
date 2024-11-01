// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_module_slug_ from "./routes/[module]/[slug].tsx";
import * as $_module_layout from "./routes/[module]/_layout.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $account_index from "./routes/account/index.tsx";
import * as $api_progress from "./routes/api/progress.ts";
import * as $api_progress_module_slug_ from "./routes/api/progress/[module]/[slug].ts";
import * as $index from "./routes/index.tsx";
import * as $ContentSidebar from "./islands/ContentSidebar.tsx";
import * as $ProgressBar from "./islands/ProgressBar.tsx";
import * as $ProgressToggle from "./islands/ProgressToggle.tsx";
import * as $TableOfContents from "./islands/TableOfContents.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[module]/[slug].tsx": $_module_slug_,
    "./routes/[module]/_layout.tsx": $_module_layout,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/account/index.tsx": $account_index,
    "./routes/api/progress.ts": $api_progress,
    "./routes/api/progress/[module]/[slug].ts": $api_progress_module_slug_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/ContentSidebar.tsx": $ContentSidebar,
    "./islands/ProgressBar.tsx": $ProgressBar,
    "./islands/ProgressToggle.tsx": $ProgressToggle,
    "./islands/TableOfContents.tsx": $TableOfContents,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
