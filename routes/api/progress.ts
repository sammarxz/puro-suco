import { defineRoute } from "$fresh/server.ts";
import { assertSignedIn, State } from "@/plugins/session.ts";
import { calculateTotalProgress } from "@/utils/content/progress.ts";
import { getAllModulesProgress } from "@/utils/db.ts";
import { getPosts } from "@/utils/content/posts.ts";

export const handler = defineRoute<State>(async (_req, ctx) => {
  assertSignedIn(ctx);

  try {
    const [modules, modulesProgress] = await Promise.all([
      getPosts(),
      getAllModulesProgress(ctx.state.sessionUser.login)
    ]);

    const progress = calculateTotalProgress(modules, modulesProgress);

    return new Response(JSON.stringify(progress), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch progress" }), 
      { status: 500 }
    );
  }
});
