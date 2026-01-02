import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../../redux/features/auth/authApi";

const Users = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  if (isLoading) return <p>Loading users...</p>;

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await deleteUser(id);
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole({ userId: id, role });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Change Role</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.email}</td>

              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.role === "admin"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
