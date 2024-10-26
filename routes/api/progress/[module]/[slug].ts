import { State } from '@/plugins/session.ts';
import { defineRoute } from '$fresh/server.ts';
import { markPostAsComplete, markPostAsIncomplete } from '@/utils/db.ts';
import { assertSignedIn } from '@/plugins/session.ts';

export const handler = defineRoute<State>(async (req, ctx) => {
  assertSignedIn(ctx);

  const { module: moduleSlug, slug: postSlug } = ctx.params;
  const userId = ctx.state.sessionUser.login;

  try {
    if (req.method === "POST") {
      await markPostAsComplete(userId, moduleSlug, postSlug);
      return new Response(null, { status: 200 });
    } 
    else if (req.method === "DELETE") {
      await markPostAsIncomplete(userId, moduleSlug, postSlug);
      return new Response(null, { status: 200 });
    }
    
    return new Response(null, { status: 405 });
  } catch (error) {
    console.error("Progress update failed:", error);
    return new Response(null, { status: 500 });
  }
});
