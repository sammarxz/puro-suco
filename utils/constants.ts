export const SITE_NAME = "UI Design na prática";
export const SITE_DESCRIPTION = "Discover new Deno projects. Share your own.";

export interface ModuleInfo {
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
    name: "Landing Pages",
    slug: "landing-pages",
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
    name: "e-Commerce",
    slug: "comercio-eletronico",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Dashboards",
    slug: "dashboards",
    status: "em_breve",
    statusText: "Em breve"
  },
  {
    name: "Aplicativo Mobile",
    slug: "aplicativo-mobile",
    status: "em_breve",
    statusText: "Em breve"
  }
] as const;

export const MODULE_STATUS = {
  COMPLETE: "completo",
  IN_PROGRESS: "em_andamento",
  COMING_SOON: "em_breve"
} as const;

export const STATUS_TEXT: Record<ModuleStatus, string> = {
  [MODULE_STATUS.COMPLETE]: "Completo",
  [MODULE_STATUS.IN_PROGRESS]: "Em andamento",
  [MODULE_STATUS.COMING_SOON]: "Em breve"
} as const;

export const modules = {
  // Obtém o texto amigável do status
  getStatusText: (status: ModuleStatus): string => STATUS_TEXT[status],
  
  // Obtém a cor do status (útil para UI)
  getStatusColor: (status: ModuleStatus): string => {
    switch (status) {
      case MODULE_STATUS.COMPLETE:
        return "text-green-500";
      case MODULE_STATUS.IN_PROGRESS:
        return "text-yellow-500";
      case MODULE_STATUS.COMING_SOON:
        return "text-gray-500";
    }
  },
  
  // Obtém o ícone do status
  getStatusIcon: (status: ModuleStatus): string => {
    switch (status) {
      case MODULE_STATUS.COMPLETE:
        return "✓";
      case MODULE_STATUS.IN_PROGRESS:
        return "↻";
      case MODULE_STATUS.COMING_SOON:
        return "⏳";
    }
  },
  
  // Verifica se um módulo está disponível
  isAvailable: (status: ModuleStatus): boolean => 
    status !== MODULE_STATUS.COMING_SOON
} as const;
