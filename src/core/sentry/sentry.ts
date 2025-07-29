import type * as SentryTypes from "@sentry/react";

// Sentry instance holder with proper typing
let SentryInstance: typeof SentryTypes | null = null;

/**
 * Initialize Sentry for error tracking and performance monitoring
 * Uses dynamic imports to keep Sentry out of the main bundle when not needed
 */
export const initSentry = async () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE; // 'development' or 'production'
  const enableErrorLogging =
    import.meta.env.VITE_ENABLE_ERROR_LOGGING === "true";

  // Only initialize if DSN is provided and error logging is enabled
  if (!dsn || !enableErrorLogging) {
    // eslint-disable-next-line no-console
    console.info(
      "Sentry not initialized. DSN:",
      !!dsn,
      "Error logging enabled:",
      enableErrorLogging,
    );
    return;
  }

  try {
    // Dynamic import to keep Sentry out of the main bundle
    const Sentry = await import("@sentry/react");

    // Store the Sentry instance for later use
    SentryInstance = Sentry;

    const appName = import.meta.env.VITE_APP_NAME || "React App";

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
        const appName = import.meta.env.VITE_APP_NAME || "React App";

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
          browser: {
            name: navigator.userAgent,
            version: navigator.appVersion,
          },
          app: {
            name: appName,
            version: "1.0.0", // You can get this from package.json
          },
        };

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
      release: `${appName}@1.0.0`, // You can get this from package.json
    });

    // eslint-disable-next-line no-console
    console.info("Sentry initialized for environment:", environment);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to initialize Sentry:", error);
  }
};

/**
 * Capture an exception with additional context
 */
export const captureException = (
  error: Error,
  context?: Record<string, string | number | boolean | null>,
) => {
  if (!SentryInstance) {
    // eslint-disable-next-line no-console
    console.warn("Sentry not initialized, cannot capture exception:", error);
    return;
  }

  SentryInstance.captureException(error, {
    extra: context,
    tags: { errorSource: "manual" },
  });
};

/**
 * Set user context for error tracking
 */
export const setSentryUser = (user: {
  id?: string;
  email?: string;
  username?: string;
}) => {
  if (!SentryInstance) return;

  SentryInstance.setUser(user);
};

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (
  message: string,
  category: string = "custom",
  level: "info" | "warning" | "error" = "info",
) => {
  if (!SentryInstance) return;

  SentryInstance.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Higher-order component for error boundaries (only available after init)
 * Note: Simplified version - for complex error boundaries, use Sentry.ErrorBoundary directly
 */
export const withSentryErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  if (!SentryInstance) return Component;

  // Use Sentry's ErrorBoundary component wrapper
  return SentryInstance.withErrorBoundary(Component, {
    showDialog: false,
  });
};

/**
 * Get Sentry ErrorBoundary component for direct use
 */
export const getSentryErrorBoundary = () => {
  if (!SentryInstance) return null;
  return SentryInstance.ErrorBoundary;
};

/**
 * Check if Sentry is initialized
 */
export const isSentryInitialized = () => !!SentryInstance;
