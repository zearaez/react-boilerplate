import React from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import GlobalErrorBoundary from "./GlobalErrorBoundary";

interface Props {
  children: React.ReactNode;
}

/**
 * Query Error Boundary specifically designed to work with React Query
 * Provides reset functionality to retry failed queries
 */
const QueryErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <GlobalErrorBoundary
          onError={(error, errorInfo) => {
            // eslint-disable-next-line no-console
            console.error(
              "Query Error Boundary caught an error:",
              error,
              errorInfo,
            );
          }}
          fallback={
            <div className="query-error-boundary">
              <div className="error-content">
                <h2>Something went wrong with data loading</h2>
                <p>
                  We encountered an error while loading your data. Please try
                  again.
                </p>
                <div className="error-actions">
                  <button onClick={reset} className="retry-button primary">
                    Try Again
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="retry-button secondary"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            </div>
          }
        >
          {children}
        </GlobalErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorBoundary;
