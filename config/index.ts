export const config = {
  baseUrl: Deno.env.get("BASE_URL") || "http://localhost:8000",
  stripe: {
    secretKey: Deno.env.get("STRIPE_SECRET_KEY") || "",
    priceId: Deno.env.get("STRIPE_PRICE_ID") || "",
    webhookSecret: Deno.env.get("STRIPE_WEBHOOK_SECRET") || "",
  },
  google: {
    clientId: Deno.env.get("GOOGLE_CLIENT_ID") || "",
    clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET") || "",
    redirectUri: Deno.env.get("GOOGLE_REDIRECT_URI") || "",
  },
  prismic: {
    repositoryName: Deno.env.get("PRISMIC_REPOSITORY_NAME") || "",
    apiToken: Deno.env.get("PRISMIC_API_TOKEN") || "",
  },
  session: {
    cookieName: "session",
    cookieSecret: Deno.env.get("COOKIE_SECRET") || "",
    expirationHours: 24,
  },
};
