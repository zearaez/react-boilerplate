import React, { useState } from "react";
import { ErrorDisplay } from "@/components/error";
import "./error-handling-demo.css";

/**
 * Example demonstrating various error handling patterns
 */
const ErrorHandlingDemo: React.FC = () => {
  const [errorType, setErrorType] = useState<string>("");
  const [currentError, setCurrentError] = useState<Error | null>(null);

  const triggerError = (type: string) => {
    setErrorType(type);

    switch (type) {
      case "network":
        setCurrentError(
          new Error("Network request failed - Unable to connect to server"),
        );
        break;
      case "validation":
        setCurrentError(
          new Error("Validation failed - Required fields are missing"),
        );
        break;
      case "permission":
        setCurrentError(
          new Error(
            "Access denied - You don't have permission to perform this action",
          ),
        );
        break;
      case "timeout":
        setCurrentError(
          new Error(
            "Request timeout - The operation took too long to complete",
          ),
        );
        break;
      case "server":
        setCurrentError(
          new Error("Internal server error - Something went wrong on our end"),
        );
        break;
      default:
        setCurrentError(new Error("Unknown error occurred"));
    }
  };

  const clearError = () => {
    setCurrentError(null);
    setErrorType("");
  };

  const retryAction = () => {
    // Simulate a successful retry
    setTimeout(() => {
      setCurrentError(null);
      setErrorType("");
      alert("Retry successful!");
    }, 1000);
  };

  return (
    <div className="error-handling-demo">
      <div className="header">
        <h2>🚨 Error Handling Patterns</h2>
        <p>Explore different error types and recovery strategies</p>
      </div>

      <div className="demo-section">
        <h3>Error Types</h3>
        <div className="error-buttons">
          <button
            onClick={() => triggerError("network")}
            className="btn btn-network"
          >
            Network Error
          </button>
          <button
            onClick={() => triggerError("validation")}
            className="btn btn-validation"
          >
            Validation Error
          </button>
          <button
            onClick={() => triggerError("permission")}
            className="btn btn-permission"
          >
            Permission Error
          </button>
          <button
            onClick={() => triggerError("timeout")}
            className="btn btn-timeout"
          >
            Timeout Error
          </button>
          <button
            onClick={() => triggerError("server")}
            className="btn btn-server"
          >
            Server Error
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Error Display</h3>
        {currentError ? (
          <div className="error-showcase">
            <ErrorDisplay
              error={currentError}
              onRetry={retryAction}
              message={`${errorType.charAt(0).toUpperCase() + errorType.slice(1)} Error Occurred`}
            />
            <button onClick={clearError} className="btn btn-clear">
              Clear Error
            </button>
          </div>
        ) : (
          <div className="no-error">
            <p>
              No errors to display. Click a button above to trigger an error.
            </p>
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>Error Boundary Test</h3>
        <ErrorBoundaryComponent />
      </div>

      <div className="demo-section">
        <h3>Async Error Example</h3>
        <AsyncErrorComponent />
      </div>

      <div className="info-section">
        <h3>📚 Error Handling Best Practices</h3>
        <div className="best-practices">
          <div className="practice-card">
            <h4>🎯 User-Friendly Messages</h4>
            <p>
              Show clear, actionable error messages instead of technical details
            </p>
          </div>
          <div className="practice-card">
            <h4>🔄 Recovery Actions</h4>
            <p>Provide retry buttons and alternative paths when errors occur</p>
          </div>
          <div className="practice-card">
            <h4>📊 Error Tracking</h4>
            <p>Log errors to monitoring services like Sentry for debugging</p>
          </div>
          <div className="practice-card">
            <h4>🛡️ Error Boundaries</h4>
            <p>
              Use React error boundaries to catch component rendering errors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Component that can trigger an error boundary
 */
const ErrorBoundaryComponent: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(
      "Component crashed! This should be caught by an error boundary.",
    );
  }

  return (
    <div className="error-boundary-section">
      <p>This component will throw an error when you click the button below.</p>
      <button onClick={() => setShouldThrow(true)} className="btn btn-danger">
        Trigger Component Error
      </button>
    </div>
  );
};

/**
 * Component demonstrating async error handling
 */
const AsyncErrorComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const simulateAsyncOperation = async (shouldFail: boolean = false) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error("Async operation failed!"));
          } else {
            resolve("success");
          }
        }, 2000);
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="async-error-section">
      <div className="async-controls">
        <button
          onClick={() => simulateAsyncOperation(false)}
          disabled={loading}
          className="btn btn-success"
        >
          {loading ? "Loading..." : "Successful Async"}
        </button>
        <button
          onClick={() => simulateAsyncOperation(true)}
          disabled={loading}
          className="btn btn-danger"
        >
          {loading ? "Loading..." : "Failing Async"}
        </button>
      </div>

      {loading && (
        <div className="loading-indicator">Processing async operation...</div>
      )}
      {success && (
        <div className="success-indicator">
          ✅ Async operation completed successfully!
        </div>
      )}
      {error && (
        <div className="error-indicator">
          ❌ Async error: {error}
          <button
            onClick={() => setError(null)}
            className="btn btn-small btn-clear"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorHandlingDemo;
