import init, { parse_markdown } from '@/wasm/markdown/markdown_parser.js';

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function renderMarkdown(content: string) {
  await init();
  
  // Parse markdown
  let html = parse_markdown(content);
  
  // Extract headings
  const headings = Array.from(html.matchAll(/<h([2-6])>(.*?)<\/h[2-6]>/g))
    .map((match) => {
      const m = match as RegExpMatchArray;
      return {
        level: parseInt(m[1]),
        text: m[2].replace(/<[^>]*>/g, '')
      };
    });
  
  // Add IDs to headings in HTML
  headings.forEach(heading => {
    const id = generateId(heading.text);
    const regex = new RegExp(`<h${heading.level}>(${heading.text})</h${heading.level}>`);
    html = html.replace(regex, `<h${heading.level} id="${id}">$1</h${heading.level}>`);
  });

  return { html, headings };
}