import { useApi } from "./useApi";
import { User } from "@/types";

/**
 * Example hook for User resource operations
 * This demonstrates how to use the generic useApi hook for specific resources
 */

export const useUsers = () => {
  const api = useApi({ resource: "users" });

  return {
    // Query hooks - for fetching data
    useUsersList: api.useList<User>,
    useUser: api.useGet<User>,

    // Mutation hooks - for modifying data
    useCreateUser: api.useCreate<User>,
    useUpdateUser: api.useUpdate<User>,
    usePatchUser: api.usePatch<User>,
    useDeleteUser: api.useDelete,

    // Form data hooks (for file uploads)
    useCreateUserWithFiles: api.useCreateFormData<User>,
    useUpdateUserWithFiles: api.useUpdateFormData<User>,
    usePatchUserWithFiles: api.usePatchFormData<User>,
  };
};

/**
 * Example usage in a component:
 *
 * const UsersList = () => {
 *   const { useUsersList, useDeleteUser } = useUsers();
 *
 *   const { data: users, isLoading, error } = useUsersList();
 *   const deleteUserMutation = useDeleteUser();
 *
 *   const handleDelete = (id: string) => {
 *     deleteUserMutation.mutate(id);
 *   };
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {users?.map(user => (
 *         <div key={user.id}>
 *           {user.first_name} {user.last_name}
 *           <button onClick={() => handleDelete(user.id)}>
 *             Delete
 *           </button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 */
