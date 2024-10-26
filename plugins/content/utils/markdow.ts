import MarkdownIt from "npm:markdown-it";
import highlightjs from "npm:markdown-it-highlightjs";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})
.use(highlightjs, { inline: true });

export function renderMarkdown(content: string) {
  return md.render(content);
}
