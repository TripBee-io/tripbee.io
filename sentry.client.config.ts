import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6ef2df78471eca092c1963bbaaa924b6@o4504750488682496.ingest.us.sentry.io/4509117039378432",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});