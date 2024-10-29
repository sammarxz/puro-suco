import { GitHubAvatarImg } from "@/components/GithubAvatarImage.tsx";
import { LogOutIcon } from "@/components/Icons.tsx";

export function NavigationBar(
  props: {
    active: string;
    class?: string;
    user?: string;
  },
) {
  return (
    <nav class={"flex " + (props.class ?? "")} f-client-nav={false}>
      <ul class="flex items-center gap-x-2 sm:gap-4 mx-4 my-2 sm:my-6 flex-wrap lg:mx-8 2xl:mr-0">
        {props.user
          ? (
            <div class="flex items-center gap-5">
              <div class="flex items-center gap-2">
                <GitHubAvatarImg login={props.user} size={32} />
                <span>
                  Olá,{"  "}<span class="text-gray-400">{props.user}</span>
                </span>
              </div>
              <a
                href="/signout?success_url=/"
                class="text-sm text-red-400 hover:text-red-500"
                title="Sair"
              >
                <LogOutIcon />
              </a>
            </div>
          )
          : (
            <a
              href="/signin"
              class="text-gray-600 hover:text-gray-900"
            >
              Fazer Login
            </a>
          )}
      </ul>
    </nav>
  );
}
