import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE; // 'development' or 'production'

  // Only initialize if DSN is provided
  if (!dsn) {
    // eslint-disable-next-line no-console
    console.info("Sentry DSN not provided. Error tracking disabled.");
    return;
  }

  Sentry.init({
    dsn,
    environment,

    // Error sampling rates - adjust based on your needs
    // Development: 100% (catch everything while developing)
    // Production: 10% (cost-effective while maintaining error visibility)
    sampleRate: environment === "development" ? 1.0 : 0.1,

    // Performance monitoring sampling
    // Lower rates for performance data as it's less critical than errors
    tracesSampleRate: environment === "development" ? 1.0 : 0.1,

    // Enhanced error context
    beforeSend(event) {
      // Add custom context and tags
      if (event.exception) {
        const appName = import.meta.env.VITE_APP_NAME || "React Boilerplate";

        event.tags = {
          ...event.tags,
          app: appName.toLowerCase().replace(/\s+/g, "-"),
          frontend: "react",
          framework: "vite",
          errorSource: "error-boundary",
        };

        // Add useful context
        event.contexts = {
          ...event.contexts,
          app: {
            name: appName,
            version: import.meta.env.VITE_APP_VERSION || "1.0.0",
            environment: environment,
          },
          browser: {
            url: window.location.href,
            userAgent: navigator.userAgent,
          },
        };
      }
      return event;
    },

    // Integration configuration
    integrations: [
      Sentry.browserTracingIntegration({
        // Capture interactions for performance monitoring
        enableInp: true,
      }),

      // Replay sessions for debugging (only in production for now)
      ...(environment === "production"
        ? [
            Sentry.replayIntegration({
              // Capture 10% of sessions, 100% of error sessions
              maskAllText: false,
              blockAllMedia: false,
            }),
          ]
        : []),
    ],

    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || "1.0.0",
  });

  // eslint-disable-next-line no-console
  console.info("Sentry initialized for environment:", environment);
};

/**
 * Capture an exception manually
 */
export const captureException = (
  error: Error,
  context?: Record<string, string | number | boolean>,
) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, {
      tags: context,
      level: "error",
    });
  }
};

/**
 * Add user context to Sentry
 */
export const setSentryUser = (user: {
  id: string;
  email?: string;
  username?: string;
}) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setUser(user);
  }
};

/**
 * Add custom breadcrumb
 */
export const addBreadcrumb = (
  message: string,
  category: string,
  level: "info" | "warning" | "error" = "info",
) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      timestamp: Date.now(),
    });
  }
};

/**
 * Higher-order component for error boundaries with Sentry
 */
export const withSentryErrorBoundary = Sentry.withErrorBoundary;

export default Sentry;
