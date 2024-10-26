export const SITE_NAME = "UI Design na prática";
export const SITE_DESCRIPTION = "Discover new Deno projects. Share your own.";

interface ModuleInfo {
  name: string;
  slug: string;
  status: ModuleStatus;
  statusText: string;
}

export type ModuleStatus = "completo" | "em_andamento" | "em_breve";


export const MODULES: ModuleInfo[] = [
  {
    name: "Conceitos Básicos",
    slug: "01-basico/01-introducao",
    status: "completo",
    statusText: "Completo"
  },
  {
    name: "Tipografia",
    slug: "tipografia",
    status: "em_andamento",
    statusText: "Em andamento"
  },
  {
    name: "Página de Destino",
    slug: "pagina-destino",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Layout",
    slug: "layout",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Fluxo do Usuário",
    slug: "fluxo-usuario",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Comércio Eletrônico",
    slug: "comercio-eletronico",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Painel de Controle",
    slug: "painel-controle",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Aplicativo",
    slug: "aplicativo",
    status: "em_breve",
    statusText: "Em breve"
  }
] as const;