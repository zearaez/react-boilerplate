import React, { useState } from "react";
import {
  captureException,
  addBreadcrumb,
  setSentryUser,
} from "@/core/sentry/sentry";
import "./sentry-test.css";

/**
 * Example component for testing Sentry error tracking and monitoring
 */
const SentryTestComponent: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");

  const testCaptureException = () => {
    try {
      // Intentionally throw an error
      throw new Error("This is a test error for Sentry!");
    } catch (error) {
      addBreadcrumb("User clicked test error button", "user_action", "info");
      captureException(error as Error, {
        testType: "manual_error_test",
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const testAsyncError = async () => {
    try {
      addBreadcrumb("Starting async operation", "async", "info");

      // Simulate async operation that fails
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Async operation failed!"));
        }, 1000);
      });
    } catch (error) {
      addBreadcrumb("Async operation failed", "async", "error");
      captureException(error as Error, {
        testType: "async_error_test",
        operation: "simulated_async_failure",
      });
    }
  };

  const testNetworkError = async () => {
    try {
      addBreadcrumb("Testing network error", "network", "info");

      // Simulate a network request that fails
      const response = await fetch("https://nonexistent-api-endpoint.com/test");
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
    } catch (error) {
      addBreadcrumb("Network request failed", "network", "error");
      captureException(error as Error, {
        testType: "network_error_test",
        endpoint: "https://nonexistent-api-endpoint.com/test",
      });
    }
  };

  const setTestUser = () => {
    if (userEmail) {
      setSentryUser({
        id: "test-user-123",
        email: userEmail,
        username: userEmail.split("@")[0],
      });
      addBreadcrumb(`Set user context: ${userEmail}`, "user", "info");
      alert(`User context set for: ${userEmail}`);
    }
  };

  const addTestBreadcrumb = () => {
    addBreadcrumb("User performed a test action", "user_action", "info");
    alert("Breadcrumb added! Check Sentry for the trail.");
  };

  return (
    <div className="sentry-test-component">
      <div className="header">
        <h2>🐛 Sentry Error Tracking Test</h2>
        <p>
          Use these buttons to test different error scenarios and Sentry
          integration.
        </p>
      </div>

      <div className="test-section">
        <h3>User Context</h3>
        <div className="user-input">
          <input
            type="email"
            placeholder="Enter test email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="email-input"
          />
          <button
            onClick={setTestUser}
            disabled={!userEmail}
            className="btn btn-primary"
          >
            Set User Context
          </button>
        </div>
      </div>

      <div className="test-section">
        <h3>Error Tests</h3>
        <div className="button-grid">
          <button onClick={testCaptureException} className="btn btn-danger">
            Test Sync Error
          </button>

          <button onClick={testAsyncError} className="btn btn-warning">
            Test Async Error
          </button>

          <button onClick={testNetworkError} className="btn btn-warning">
            Test Network Error
          </button>

          <button onClick={addTestBreadcrumb} className="btn btn-info">
            Add Breadcrumb
          </button>
        </div>
      </div>

      <div className="test-section">
        <h3>Error Boundary Test</h3>
        <ErrorBoundaryTest />
      </div>

      <div className="info-section">
        <h3>ℹ️ How to Use</h3>
        <ul>
          <li>
            <strong>Set User Context:</strong> Enter an email to associate
            errors with a user
          </li>
          <li>
            <strong>Test Sync Error:</strong> Throws a synchronous error
            immediately
          </li>
          <li>
            <strong>Test Async Error:</strong> Simulates an async operation
            failure
          </li>
          <li>
            <strong>Test Network Error:</strong> Simulates a failed API request
          </li>
          <li>
            <strong>Add Breadcrumb:</strong> Adds a custom breadcrumb for
            debugging
          </li>
          <li>
            <strong>Error Boundary:</strong> Tests React error boundary
            integration
          </li>
        </ul>
        <p>
          <em>
            Check your Sentry dashboard to see the captured errors and context!
          </em>
        </p>
      </div>
    </div>
  );
};

/**
 * Component to test error boundaries
 */
const ErrorBoundaryTest: React.FC = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error("Error Boundary Test: Component intentionally crashed!");
  }

  return (
    <div className="error-boundary-test">
      <p>This component will throw an error when you click the button below.</p>
      <button onClick={() => setShouldError(true)} className="btn btn-danger">
        Trigger Error Boundary
      </button>
    </div>
  );
};

export default SentryTestComponent;
