import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePrefetch } from "@/hooks/usePrefetch";
import { useInfiniteScrollPrefetch } from "@/hooks/useInfiniteScrollPrefetch";
import { ErrorDisplay } from "@/components/error";
import PrefetchLink from "@/components/PrefetchLink";
import "./enhanced-users-list.css";

/**
 * Example component demonstrating optimistic updates, error handling, and prefetching
 */
const EnhancedUsersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Use our enhanced hooks
  const { useUsersList, useCreateUser, useDeleteUser, useUpdateUser } =
    useUsers();
  const { prefetchItem } = usePrefetch();

  // Query with error handling
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useUsersList({ page, search: searchQuery });

  // Mutations with optimistic updates
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  // Infinite scroll prefetching
  useInfiniteScrollPrefetch({
    resource: "users",
    currentPage: page,
    hasNextPage: true, // You'd get this from your API response
    params: { search: searchQuery },
  });

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        first_name: "New",
        last_name: "User",
        email: "newuser@example.com",
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to create user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdateUser = async (id: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id,
        data: { first_name: "Updated Name" },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to update user:", error);
    }
  };

  // Prefetch user details on hover
  const handleUserHover = (userId: string) => {
    prefetchItem("users", userId);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="enhanced-users-list">
      <div className="header">
        <h1>Enhanced Users List</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button
            onClick={handleCreateUser}
            disabled={createUserMutation.isPending}
            className="create-button"
          >
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>

      {/* Error Display with retry functionality */}
      <ErrorDisplay
        error={error}
        onRetry={refetch}
        message="Failed to load users. Please try again."
      />

      {/* Mutation errors */}
      <ErrorDisplay
        error={createUserMutation.error}
        onRetry={() => createUserMutation.reset()}
        message="Failed to create user."
        className="small"
      />

      <div className="users-grid">
        {users?.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onMouseEnter={() => handleUserHover(user.id)}
          >
            <div className="user-info">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>{user.email}</p>
            </div>

            <div className="user-actions">
              {/* Prefetching link to user details */}
              <PrefetchLink
                to={`/users/${user.id}`}
                resource="users"
                id={user.id}
                className="view-link"
              >
                View Details
              </PrefetchLink>

              <button
                onClick={() => handleUpdateUser(user.id)}
                disabled={updateUserMutation.isPending}
                className="update-button"
              >
                {updateUserMutation.isPending &&
                updateUserMutation.variables?.id === user.id
                  ? "Updating..."
                  : "Update"}
              </button>

              <button
                onClick={() => handleDeleteUser(user.id)}
                disabled={deleteUserMutation.isPending}
                className="delete-button"
              >
                {deleteUserMutation.isPending &&
                deleteUserMutation.variables === user.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>

            {/* Show individual mutation states */}
            {deleteUserMutation.error &&
              deleteUserMutation.variables === user.id && (
                <ErrorDisplay
                  error={deleteUserMutation.error}
                  onRetry={() => deleteUserMutation.reset()}
                  message="Failed to delete user."
                  className="small"
                />
              )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      {/* Loading states for mutations */}
      {(createUserMutation.isPending ||
        deleteUserMutation.isPending ||
        updateUserMutation.isPending) && (
        <div className="global-loading">
          <div className="loading-bar">Processing...</div>
        </div>
      )}
    </div>
  );
};

export default EnhancedUsersList;
