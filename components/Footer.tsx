import type { JSX } from "preact";

export default function Footer(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      class={`border-t-2 border-gray-200 md:h-16 flex mt-16 justify-center md:mx-16 ${props.class}`}
    >
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-screen-xl mx-auto w-full sm:px-6 md:px-8 p-4">
        <div class="text-gray-600 text-center">
          <span>
            © {new Date().getFullYear()} Puro Suco por
            <a
              href="https://marxz.me/#puro-suco"
              target="blank"
              class="underline"
            >
              @sammarxz
            </a>
          </span>
        </div>

        <div class="flex items-center gap-8">
          <a href="https://fresh.deno.dev">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
