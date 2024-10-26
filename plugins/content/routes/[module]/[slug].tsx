import { defineRoute } from "$fresh/server.ts";
import { renderMarkdown } from "../../utils/markdow.ts";

import { getPost } from "../../utils/posts.ts";

import Head from "../../../../components/Head.tsx";

const HIGHLIGHTJS_STYLES = `
  /* github.min.css do highlight.js */
  .hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-variable,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id{color:#005cc5}.hljs-regexp,.hljs-string,.hljs-meta .hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-comment,.hljs-code,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}
`;

// Estilos base para o markdown
const MARKDOWN_STYLES = `
  .markdown-body {
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .markdown-body h1 { font-size: 2em; margin: .67em 0; }
  .markdown-body h2 { font-size: 1.5em; margin: .75em 0; }
  .markdown-body h3 { font-size: 1.25em; margin: .83em 0; }
  .markdown-body h4 { font-size: 1em; margin: 1.12em 0; }
  
  .markdown-body pre {
    background-color: #f6f8fa;
    border-radius: 6px;
    padding: 16px;
    overflow: auto;
  }

  .markdown-body code {
    background-color: rgba(27,31,35,.05);
    border-radius: 6px;
    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
    font-size: 85%;
    margin: 0;
    padding: .2em .4em;
  }

  .markdown-body pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
  }

  .markdown-body a {
    color: #0366d6;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }

  .markdown-body blockquote {
    border-left: .25em solid #dfe2e5;
    color: #6a737d;
    padding: 0 1em;
    margin: 0;
  }

  .markdown-body ul,
  .markdown-body ol {
    padding-left: 2em;
  }

  .markdown-body img {
    max-width: 100%;
    height: auto;
  }

  @media (prefers-color-scheme: dark) {
    .markdown-body {
      color: #c9d1d9;
    }

    .markdown-body pre {
      background-color: #161b22;
    }

    .markdown-body code {
      background-color: rgba(240,246,252,.15);
    }

    .markdown-body a {
      color: #58a6ff;
    }

    .markdown-body blockquote {
      border-left-color: #30363d;
      color: #8b949e;
    }
  }
`;

export default defineRoute(async (_req, ctx) => {
  const post = await getPost(ctx.params.module, ctx.params.slug);
  if (post === null) return await ctx.renderNotFound();

  const content = renderMarkdown(post.content);

  return (
    <>
      <Head title={post.title} href={ctx.url.href}>
        <style dangerouslySetInnerHTML={{ __html: MARKDOWN_STYLES }} />
        <style dangerouslySetInnerHTML={{ __html: HIGHLIGHTJS_STYLES }} />
      </Head>
      <main class="p-4 flex-1">
        <div class="mb-6">
          <a href="/blog" class="text-blue-500 hover:underline">
            ← Back to Blog
          </a>
          <div class="text-gray-500 mt-2">{post.module}</div>
        </div>
        <h1 class="text-4xl font-bold">{post.title}</h1>
        {post.publishedAt.toString() !== "Invalid Date" && (
          <time
            dateTime={post.publishedAt.toISOString()}
            class="text-gray-500"
          >
            {post.publishedAt.toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </time>
        )}
        <div
          class="mt-8 markdown-body !bg-transparent !dark:text-white"
          data-color-mode="auto"
          data-light-theme="light"
          data-dark-theme="dark"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </>
  );
});
