import type { Handlers, PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

import { renderMarkdown } from "@/utils/content/markdow.ts";
import {
  findAdjacentPosts,
  getPost,
  getPosts,
  type Post,
} from "@/utils/content/posts.ts";
import { isPostComplete } from "@/utils/db.ts";

import { ProgressToggle } from "@/islands/ProgressToggle.tsx";

import Head from "@/components/Head.tsx";
import { TableOfContents } from "@/islands/TableOfContents.tsx";
import { PostNavigation } from "@/components/PostNavigation.tsx";
import Footer from "@/components/Footer.tsx";
import { EditIcon } from "@/components/Icons.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.module, ctx.params.slug);
    if (post === null) return await ctx.renderNotFound();

    const modules = await getPosts();
    const { prevPost, nextPost } = findAdjacentPosts(
      modules,
      post.moduleSlug,
      post.slug,
    );

    const isComplete = ctx.state.sessionUser
      ? await isPostComplete(
        ctx.state.sessionUser.login,
        post.moduleSlug,
        post.slug,
      )
      : false;

    return ctx.render({
      post,
      prevPost,
      nextPost,
      isComplete,
    });
  },
};

interface ContentPageProps {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
  isComplete: boolean;
}

export default function ContentPage(props: PageProps<ContentPageProps>) {
  const { isComplete, post, prevPost, nextPost } = props.data;
  const { html, headings } = renderMarkdown(post.content);

  return (
    <>
      <Head title={post.title} href={"ctx.url.href"}>
        <link rel="stylesheet" href="/markdown.css" />
      </Head>
      <Partial name="docs-main">
        <div class="w-full min-w-0">
          <main class="lg:ml-[18rem] mt-4 min-w-0 mx-auto">
            <div class="flex gap-6 md:gap-8 xl:gap-[8%] flex-col xl:flex-row md:mx-8 lg:mx-16 2xl:mx-0 lg:justify-end">
              <TableOfContents headings={headings} />
              <div class="lg:order-1 min-w-0 max-w-3xl w-full">
                <h1 class="text-4xl text-gray-900 tracking-tight font-bold md:mt-0 px-4 md:px-0 mb-4">
                  {post.title}
                </h1>

                <div
                  class="markdown-body mb-8"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {props.state.sessionUser && (
                  <div class="mb-8">
                    <ProgressToggle
                      initialComplete={isComplete}
                      userId={props.state.sessionUser.login}
                      moduleSlug={post.moduleSlug}
                      postSlug={post.slug}
                    />
                  </div>
                )}

                <div class="">
                  <PostNavigation prevPost={prevPost} nextPost={nextPost} />
                </div>
                <hr />
                <div class="px-4 md:px-0 flex justify-between my-6">
                  <a
                    href={`https://github.com/sammarxz/fresh/edit/main/${post.slug}`}
                    class="text-lime-500 underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EditIcon />
                    Edite essa página no GitHub
                  </a>
                </div>
              </div>
            </div>
            <div class="xl:ml-[3.75rem]">
              <Footer />
            </div>
          </main>
        </div>
      </Partial>
    </>
  );
}
