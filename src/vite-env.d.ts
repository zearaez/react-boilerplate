/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENABLE_OPTIMISTIC_UPDATES: string;
  readonly VITE_ENABLE_PREFETCHING: string;
  readonly VITE_ENABLE_QUERY_DEVTOOLS: string;
  readonly VITE_ENABLE_ERROR_LOGGING: string;
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_GITHUB_CLIENT_ID?: string;
  readonly VITE_JWT_SECRET?: string;
  readonly VITE_JWT_EXPIRES_IN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
