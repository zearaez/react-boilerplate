import React from "react";

interface ErrorDisplayProps {
  error: Error | null;
  onRetry?: () => void;
  message?: string;
  className?: string;
}

/**
 * Component for displaying API errors inline with retry functionality
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  message,
  className = "",
}) => {
  if (!error) return null;

  const errorMessage =
    message || error.message || "An unexpected error occurred";

  return (
    <div className={`error-display ${className}`}>
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h4>Error</h4>
        <p>{errorMessage}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
