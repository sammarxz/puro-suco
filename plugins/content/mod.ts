import type { Plugin } from "$fresh/server.ts";
import { normalize } from "$std/url/normalize.ts";

import BlogIndex from "./routes/index.tsx";
import BlogSlug from "./routes/[module]/[slug].tsx";

export function blog(): Plugin {
  return {
    name: "blog",
    routes: [{
      path: "/conteudos",
      component: BlogIndex,
    }, {
      path: "/conteudos/[module]/[slug]",
      component: BlogSlug,
    }],
    location: import.meta.url,
    projectLocation: normalize(import.meta.url + "../../../").href,
  };
}