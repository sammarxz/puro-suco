// deno-lint-ignore-file
// components/GoogleAnalytics.tsx
import { IS_BROWSER } from "$fresh/runtime.ts";

interface GAProps {
  measurementId: string;
  // Permite desabilitar o GA em ambientes de desenvolvimento
  disabled?: boolean;
}

export function GoogleAnalytics({ measurementId, disabled = false }: GAProps) {
  // Não carrega o GA se estiver desabilitado ou se não estiver no browser
  if (disabled || !IS_BROWSER) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

// Função helper para enviar eventos
export function sendGAEvent(
  eventName: string,
  eventParams?: { [key: string]: any },
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}
