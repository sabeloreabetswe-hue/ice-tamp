import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUsers, suspendUser, activateUser, deleteUser, verifyUser, rejectVerification,} from "../../services/userService";
import { getUserStatistics } from "../../services/adminStatisticsService";


const ROLE_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "freightOwner", label: "Freight Owners" },
  { value: "transporter", label: "Transporters" },
  { value: "admin", label: "Admins" },
];

const formatRoleLabel = (role) => {
  switch (role) {
    case "freightOwner":
      return "Freight Owner";
    case "transporter":
      return "Transporter";
    case "admin":
      return "Administrator";
    default:
      return role || "Unknown";
  }
};

const UserManagement = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // NEW
  const [selectedUser, setSelectedUser] = useState(null);

  const [userStats, setUserStats] = useState({
  loads: 0,
  trucks: 0,
  matches: 0,
  shipments: 0,
  ratings: 0,
  });


const refreshUsers = () => {
  setUsers(getUsers());
};

useEffect(() => {
  refreshUsers();

  window.addEventListener("storage", refreshUsers);
  window.addEventListener("focus", refreshUsers);

  return () => {
    window.removeEventListener("storage", refreshUsers);
    window.removeEventListener("focus", refreshUsers);
  };
}, []);

const handleSuspend = (targetUser) => {
  const confirmed = window.confirm(
    `Suspend ${targetUser.fullName || targetUser.email}?`
  );

  if (!confirmed) return;

  suspendUser(targetUser.email);

  refreshUsers();

  if (
    selectedUser &&
    selectedUser.email === targetUser.email
  ) {
    setSelectedUser({
      ...selectedUser,
      status: "Suspended",
    });
  }

  alert("User suspended successfully.");
};

const handleActivate = (targetUser) => {
  activateUser(targetUser.email);

  refreshUsers();

  if (
    selectedUser &&
    selectedUser.email === targetUser.email
  ) {
    setSelectedUser({
      ...selectedUser,
      status: "Active",
    });
  }

  alert("User activated successfully.");
};

const handleDelete = (targetUser) => {
  const confirmed = window.confirm(
    `Delete ${targetUser.fullName || targetUser.email}?\n\nThis action cannot be undone.`
  );

  if (!confirmed) return;

  deleteUser(targetUser.email);

  refreshUsers();

  if (
    selectedUser &&
    selectedUser.email === targetUser.email
  ) {
    setSelectedUser(null);
  }

  alert("User deleted successfully.");
};

const handleVerify = (targetUser) => {
  verifyUser(targetUser.email);

  refreshUsers();

  const updatedUser = getUsers().find(
    (u) => u.email === targetUser.email
  );

  if (selectedUser && selectedUser.email === targetUser.email) {
    setSelectedUser(updatedUser);
  }

  alert("Business verification approved.");
};

const handleRejectVerification = (targetUser) => {
  rejectVerification(targetUser.email);

  refreshUsers();

  const updatedUser = getUsers().find(
    (u) => u.email === targetUser.email
  );

  if (selectedUser && selectedUser.email === targetUser.email) {
    setSelectedUser(updatedUser);
  }

  alert("Business verification rejected.");
};

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-[#2A3663]">
            User Management
          </h2>

          <p className="text-gray-500 mt-1">
            Manage all registered platform users.
          </p>
        </div>

        <div className="bg-[#F4F4E6] px-4 py-2 rounded-full text-sm font-medium text-[#2A3663]">
          Signed in as {user?.fullName || "Administrator"}
        </div>

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 flex-1"
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          {ROLE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {/* Users Table */}

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b text-gray-600">

              <th className="p-3">Name</th>

              <th className="p-3">Email</th>

              <th className="p-3">Role</th>

              <th className="p-3">Status</th>

              <th className="p-3">
                Verification
              </th>

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr
                  key={user.email}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {user.fullName ||
                      user.name ||
                      "Unnamed User"}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {formatRoleLabel(user.role)}
                    </span>

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        (user.status || "Active") === "Suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.status || "Active"}
                    </span>

                  </td>

                  <td className="p-3">

                <span
              className={`px-3 py-1 rounded-full text-sm ${
                (user.verification || "Pending") === "Verified"
                  ? "bg-green-100 text-green-700"
                  : (user.verification || "Pending") === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {user.verification || "Pending"}
            </span>

          </td>

                 <td className="p-3 text-center">

  <div className="flex justify-center gap-2">

    {/* View Button */}
    <button
  onClick={() => {
    setSelectedUser(user);

    setUserStats(
      getUserStatistics(user.email)
    );
  }}
  className="px-3 py-2 rounded-lg bg-[#2A3663] text-white hover:bg-[#1f2a4d]"
>
  View
</button>

    {/* Activate / Suspend Button */}
    {(user.status || "Active") === "Suspended" ? (

      <button
        onClick={() => handleActivate(user)}
        className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        Activate
      </button>

    ) : (

      <button
        onClick={() => handleSuspend(user)}
        className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Suspend
      </button>

          )}

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(user)}
            className="px-3 py-2 rounded-lg bg-red-800 text-white hover:bg-red-900"
          >
            Delete
          </button>

          {/* Verify */}

      <button
        onClick={() => handleVerify(user)}
        className="px-3 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
      >
        Verify
      </button>

      {/* Reject */}

      <button
        onClick={() => handleRejectVerification(user)}
        className="px-3 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700"
      >
        Reject
      </button>

        </div>

      </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* User Details */}

      {selectedUser && (

        <div className="mt-10 border-t pt-8">

          <h3 className="text-2xl font-bold text-[#2A3663] mb-6">
            User Details
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <strong>Full Name</strong>
              <p>{selectedUser.fullName || "N/A"}</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>{selectedUser.email}</p>
            </div>

            <div>
              <strong>Role</strong>
              <p>
                {formatRoleLabel(
                  selectedUser.role
                )}
              </p>
            </div>

            <div>
              <strong>Status</strong>
              <p>
                {selectedUser.status || "Active"}
              </p>
            </div>

            <div>
              <strong>Phone</strong>
              <p>
                {selectedUser.phone ||
                  "Not Provided"}
              </p>
            </div>

            <div>
              <strong>Company</strong>
              <p>
                {selectedUser.company ||
                  "Not Provided"}
              </p>
            </div>

            <div>
              <strong>Verification</strong>

              <p>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    (selectedUser.verification || "Pending") === "Verified"
                      ? "bg-green-100 text-green-700"
                      : (selectedUser.verification || "Pending") === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {selectedUser.verification || "Pending"}
                </span>

              </p>
            </div>

            <div>
              <strong>Registered</strong>
              <p>
                {selectedUser.createdAt
                  ? new Date(
                      selectedUser.createdAt
                    ).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

          </div>

         <div className="flex flex-wrap gap-3 mt-8">

 

  <button
    onClick={() => setSelectedUser(null)}
    className="px-5 py-2 rounded-lg bg-red-500 text-white"
  >
    Close
  </button>

</div>

{/* User Statistics */}

<div className="mt-8">

  <h3 className="text-xl font-bold text-[#2A3663] mb-4">
    User Statistics
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold">{userStats.loads}</p>
      <p className="text-gray-500">Loads</p>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold">{userStats.trucks}</p>
      <p className="text-gray-500">Trucks</p>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold">{userStats.matches}</p>
      <p className="text-gray-500">Matches</p>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold">{userStats.shipments}</p>
      <p className="text-gray-500">Shipments</p>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold">{userStats.ratings}</p>
      <p className="text-gray-500">Ratings</p>
    </div>

  </div>



</div>

        </div>

      )}

    </div>
  );
};

export default UserManagement;