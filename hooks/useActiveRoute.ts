import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ActiveRoute {
  moduleSlug: string | undefined;
  postSlug: string | undefined;
}

export function useActiveRoute(initialModule?: string, initialPost?: string) {
  const activeModule = useSignal<string | undefined>(initialModule);
  const activeSlug = useSignal<string | undefined>(initialPost);

  useEffect(() => {
    if (!IS_BROWSER) return;

    // Função para atualizar estado baseado na URL atual
    function updateActiveState() {
      const pathParts = location.pathname.split("/").filter(Boolean);
      activeModule.value = pathParts[0];
      activeSlug.value = pathParts[1];
    }

    // Atualizar estado inicial
    updateActiveState();

    // Observar mudanças na navegação
    addEventListener("popstate", updateActiveState);
    
    return () => {
      removeEventListener("popstate", updateActiveState);
    };
  }, []);

  // Retornar valores e uma função para atualizar manualmente
  return {
    activeModule,
    activeSlug,
    setActive: (moduleSlug: string, postSlug: string) => {
      activeModule.value = moduleSlug;
      activeSlug.value = postSlug;
    }
  };
}