import { NavigationBar } from "./NavigationBar.tsx";

export default function Header(props: { title: string; active: string }) {
  const isHome = props.active == "/";
  const isDocs = props.active == "/docs";

  return (
    <header
      class={[
        "mx-auto flex gap-3 items-center",
        isHome ? "justify-end" : "justify-between",
        isDocs
          ? "h-20 max-w-screen-2xl w-full sticky top-0 bg-white/75 z-50 backdrop-blur-sm"
          : "h-20 max-w-screen-xl",
      ].join(" ")}
      f-client-nav={false}
    >
      {!isHome && (
        <div class="p-4 flex items-center">
          <Logo />
        </div>
      )}
      <NavigationBar class="" active={props.active} />
    </header>
  );
}

export function Logo() {
  return (
    <a
      href="/"
      class="block"
      aria-label="Top Page"
    >
      <img
        src="/logo-symbol.svg"
        alt="Logo Puro Suco"
        class="w-8 h-auto"
      />
    </a>
  );
}
