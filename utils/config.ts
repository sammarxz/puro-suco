export const GA_MEASUREMENT_ID = Deno.env.get("GA_MEASUREMENT_ID") ?? "";

if (!GA_MEASUREMENT_ID) {
  console.warn("GA_MEASUREMENT_ID não está definido nas variáveis de ambiente");
}