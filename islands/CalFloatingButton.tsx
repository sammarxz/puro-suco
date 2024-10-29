// deno-lint-ignore-file

import { useEffect } from "preact/hooks";

interface CalNamespaceFunction {
  (action: string, config: any): void;
  q?: Array<{ [key: string]: any }>;
}

interface CalType {
  (action: string, ...args: any[]): void;
  loaded?: boolean;
  ns?: {
    [key: string]: CalNamespaceFunction;
  };
  q?: any[];
}

declare global {
  interface Window {
    Cal?: CalType;
  }

  var Cal: CalType | undefined;
}

export function CalFloatingButton() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Função do Cal.com adaptada
    (function (C, A, L) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal?.loaded) {
          cal = C.Cal as CalType;
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          } as CalNamespaceFunction;
          const namespace = ar[1] as string;
          api.q = api.q || [];
          if (namespace) {
            if (!cal?.ns) cal!.ns = {};
            cal!.ns[namespace] = cal!.ns[namespace] || api;
            p(cal!.ns[namespace], ar);
            p(cal!, ["initNamespace", namespace]);
          } else p(cal!, ar);
          return;
        }
        p(cal!, ar);
      };
    })(
      globalThis as typeof globalThis & Window,
      "https://app.cal.com/embed/embed.js",
      "init",
    );

    // Garantir que Cal existe antes de usar
    const cal = (globalThis as typeof globalThis & Window).Cal;
    if (!cal) return;

    // Inicializa o Cal.com
    cal("init", "mentoria-1h", { origin: "https://cal.com" });

    // Espera um momento para garantir que o namespace foi criado
    setTimeout(() => {
      if (!cal.ns?.["mentoria-1h"]) return;

      // Configura o botão flutuante
      cal.ns["mentoria-1h"]("floatingButton", {
        calLink: "sammarxz/mentoria-1h",
        config: {
          layout: "month_view",
          theme: "light",
        },
        buttonText: "Reserve sua mentoria",
        hideButtonIcon: false,
        buttonColor: "#d9f99d",
        buttonTextColor: "#2f4d08",
      });

      // Configura a UI
      cal.ns["mentoria-1h"]("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#d9f99d",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }, 100);

    // Cleanup
    return () => {
      if (typeof document === "undefined") return;

      const floatingButton = document.querySelector(".cal-floating-button");
      if (floatingButton) {
        floatingButton.remove();
      }

      // Limpa o objeto Cal global de forma segura
      if ((globalThis as typeof globalThis & Window).Cal) {
        delete (globalThis as typeof globalThis & Window).Cal;
      }
    };
  }, []);

  return null;
}
