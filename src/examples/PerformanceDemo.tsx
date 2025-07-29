import React, { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePrefetch } from "@/hooks/usePrefetch";
import "./performance-demo.css";

/**
 * Example demonstrating React Query performance optimizations
 */
const PerformanceDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basic" | "prefetch" | "optimistic"
  >("basic");
  const [logs, setLogs] = useState<string[]>([]);

  const { useUsersList, useCreateUser } = useUsers();
  const { prefetchList, prefetchItem } = usePrefetch();

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  // Basic query (no optimizations)
  const basicQuery = useUsersList({ page: 1 });

  // Optimistic updates mutation
  const createUserMutation = useCreateUser();

  useEffect(() => {
    if (basicQuery.isLoading) {
      addLog("🔄 Basic query: Loading users...");
    } else if (basicQuery.data) {
      addLog(`✅ Basic query: Loaded ${basicQuery.data.length} users`);
    }
  }, [basicQuery.isLoading, basicQuery.data]);

  const handlePrefetchDemo = async () => {
    addLog("🚀 Starting prefetch demo...");

    // Prefetch multiple resources
    await Promise.all([
      prefetchList("users", { page: 2 }),
      prefetchList("users", { page: 3 }),
      prefetchItem("users", "1"),
    ]);

    addLog("✨ Prefetched: Page 2, Page 3, and User #1");
    addLog("💡 Try navigating - these should load instantly!");
  };

  const handleOptimisticUpdate = async () => {
    addLog("⚡ Creating user with optimistic update...");

    try {
      await createUserMutation.mutateAsync({
        first_name: "Optimistic",
        last_name: "User",
        email: `test-${Date.now()}@example.com`,
      });
      addLog("✅ User created successfully!");
    } catch (error) {
      addLog(
        `❌ User creation failed (reverted optimistically), Full error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const handleBackgroundRefetch = () => {
    addLog("🔄 Triggering background refetch...");
    basicQuery.refetch();
    addLog("💫 Data refreshed silently in background");
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="performance-demo">
      <div className="header">
        <h2>⚡ React Query Performance Demo</h2>
        <p>Explore caching, prefetching, and optimistic updates</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Queries
        </button>
        <button
          className={`tab ${activeTab === "prefetch" ? "active" : ""}`}
          onClick={() => setActiveTab("prefetch")}
        >
          Prefetching
        </button>
        <button
          className={`tab ${activeTab === "optimistic" ? "active" : ""}`}
          onClick={() => setActiveTab("optimistic")}
        >
          Optimistic Updates
        </button>
      </div>

      <div className="content">
        {activeTab === "basic" && (
          <div className="tab-content">
            <h3>📊 Basic Query Features</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Cache Status</h4>
                <div className="status">
                  {basicQuery.isFetching ? (
                    <span className="status-fetching">🔄 Fetching</span>
                  ) : basicQuery.data ? (
                    <span className="status-cached">✅ Cached</span>
                  ) : (
                    <span className="status-empty">⏳ No Data</span>
                  )}
                </div>
              </div>

              <div className="feature-card">
                <h4>Data Freshness</h4>
                <div className="status">
                  {basicQuery.isStale ? (
                    <span className="status-stale">🕐 Stale</span>
                  ) : (
                    <span className="status-fresh">✨ Fresh</span>
                  )}
                </div>
              </div>

              <div className="feature-card">
                <h4>Background Updates</h4>
                <button
                  onClick={handleBackgroundRefetch}
                  className="btn btn-primary"
                >
                  Trigger Refetch
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prefetch" && (
          <div className="tab-content">
            <h3>🚀 Prefetching Strategies</h3>
            <div className="prefetch-demo">
              <div className="info-card">
                <h4>What is Prefetching?</h4>
                <p>
                  Load data in the background before users need it. This makes
                  navigation feel instant!
                </p>
              </div>

              <div className="demo-actions">
                <button
                  onClick={handlePrefetchDemo}
                  className="btn btn-primary"
                >
                  Demo Prefetch (Pages 2-3)
                </button>
                <button
                  onClick={() => prefetchItem("users", "1")}
                  className="btn btn-secondary"
                >
                  Prefetch User #1
                </button>
              </div>

              <div className="prefetch-tips">
                <h4>💡 Prefetching Tips</h4>
                <ul>
                  <li>Prefetch on hover (we do this automatically)</li>
                  <li>Prefetch next pages during infinite scroll</li>
                  <li>Prefetch related data based on user behavior</li>
                  <li>Use route-based prefetching for navigation</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "optimistic" && (
          <div className="tab-content">
            <h3>⚡ Optimistic Updates</h3>
            <div className="optimistic-demo">
              <div className="info-card">
                <h4>How Optimistic Updates Work</h4>
                <p>
                  Update UI immediately, then sync with server. If it fails,
                  automatically revert!
                </p>
              </div>

              <div className="demo-actions">
                <button
                  onClick={handleOptimisticUpdate}
                  disabled={createUserMutation.isPending}
                  className="btn btn-success"
                >
                  {createUserMutation.isPending
                    ? "Creating..."
                    : "Create User (Optimistic)"}
                </button>
              </div>

              <div className="mutation-status">
                <h4>Mutation Status</h4>
                <div className="status-grid">
                  <div>
                    Pending: {createUserMutation.isPending ? "✅" : "❌"}
                  </div>
                  <div>
                    Success: {createUserMutation.isSuccess ? "✅" : "❌"}
                  </div>
                  <div>Error: {createUserMutation.isError ? "✅" : "❌"}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="logs-section">
        <div className="logs-header">
          <h3>📝 Activity Logs</h3>
          <button onClick={clearLogs} className="btn btn-small">
            Clear
          </button>
        </div>
        <div className="logs">
          {logs.length === 0 ? (
            <div className="no-logs">No activity yet. Try the demos above!</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDemo;
