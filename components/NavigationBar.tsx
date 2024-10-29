import * as Icons from "./Icons.tsx";

export function NavigationBar(
  props: {
    active: string;
    class?: string;
    user?: string;
  },
) {
  // const items = [
  // {
  //   name: "Feedback",
  //   href: "https://deno.com/blog?tag=fresh",
  // },
  // ];

  return (
    <nav class={"flex " + (props.class ?? "")} f-client-nav={false}>
      <ul class="flex items-center gap-x-2 sm:gap-4 mx-4 my-2 sm:my-6 flex-wrap lg:mx-8 2xl:mr-0">
        {
          /* {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              class={`p-1 sm:p-2 ${
                isHome ? "text-green-900" : "text-gray-600"
              } hover:underline aria-[current]:font-bold`}
            >
              {item.name}
            </a>
          </li>
        ))} */
        }

        <li class="flex items-center">
          <a
            href="https://github.com/sammarxz/puro-suco"
            class="hover:text-amber-400 inline-block transition"
            aria-label="GitHub"
          >
            <Icons.GitHub />
          </a>
        </li>
        {props.user
          ? (
            <div class="flex gap-5">
              <span>
                Olá,{"  "}<span class="text-gray-600">{props.user}</span>
              </span>
              <a
                href="/signout?success_url=/"
                class="text-gray-600 hover:text-gray-900"
              >
                Sair
              </a>
            </div>
          )
          : (
            <a
              href="/signin"
              class="text-gray-600 hover:text-gray-900"
            >
              Entrar
            </a>
          )}
      </ul>
    </nav>
  );
}
