import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistor, store } from "@/store/store";
import init from "@/init";
import GlobalErrorBoundary from "./components/error/GlobalErrorBoundary";
import QueryErrorBoundary from "./components/error/QueryErrorBoundary";
import "./components/error/error-styles.css";
import { initSentry } from "@/core/sentry/sentry";

// Initialize Sentry for error tracking
initSentry();

// Set document title from environment variable
document.title = import.meta.env.VITE_APP_NAME || "React App";

// Initialize React Query client with enhanced prefetching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: true,
      retryDelay: 1000,
      // Enhanced prefetching options
      refetchOnMount: "always",
      gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    },
    mutations: {
      retry: false,
      // Improved error handling for mutations
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error("Mutation error:", error);
        // You can add global mutation error handling here
      },
    },
  },
});
init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <QueryErrorBoundary>
              <App />
            </QueryErrorBoundary>
            {import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GlobalErrorBoundary>
  </StrictMode>,
);
