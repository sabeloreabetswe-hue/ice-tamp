import { useEffect, useState } from "react";

import { getUsers } from "../../services/userService";

const ROLE_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "freightOwner", label: "Freight Owners" },
  { value: "transporter", label: "Transporters" },
  { value: "admin", label: "Admins" },
];

const formatRoleLabel = (role) => {
  if (role === "freightOwner") return "Freight Owner";
  if (role === "transporter") return "Transporter";
  if (role === "admin") return "Admin";
  return role || "Unknown";
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const refreshUsers = () => setUsers(getUsers());

    refreshUsers();

    window.addEventListener("storage", refreshUsers);
    window.addEventListener("focus", refreshUsers);

    return () => {
      window.removeEventListener("storage", refreshUsers);
      window.removeEventListener("focus", refreshUsers);
    };
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#2A3663]">User Management</h2>
        <p className="text-gray-500">Total Users: {users.length}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.email} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {formatRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
