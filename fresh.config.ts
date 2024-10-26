import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

import sessionPlugin from "./plugins/session.ts";
import errorHandling from "./plugins/error_handling.ts";
import securityHeaders from "./plugins/security_headers.ts";
import kvOAuthPlugin from "./plugins/kv_oauth.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    kvOAuthPlugin,
    sessionPlugin,
    errorHandling,
    securityHeaders,
  ],
});