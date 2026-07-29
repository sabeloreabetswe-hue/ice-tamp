import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaChartBar,
  FaClipboardList,
  FaTruck,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import { useAuth } from "../../context/AuthContext";
import { getAdminStats } from "../../services/adminService";
import { getUsers } from "../../services/authService";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    freightOwners: 0,
    transporters: 0,
    totalLoads: 0,
    totalTrucks: 0,
    totalRequests: 0,
    totalShipments: 0,
    completedDeliveries: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const refreshDashboard = () => {
      setStats(getAdminStats());

      const users = getUsers()
        .slice()
        .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
        .slice(0, 5);

      setRecentUsers(users);
    };

    refreshDashboard();

    window.addEventListener("storage", refreshDashboard);
    window.addEventListener("focus", refreshDashboard);

    return () => {
      window.removeEventListener("storage", refreshDashboard);
      window.removeEventListener("focus", refreshDashboard);
    };
  }, []);

  const adminRoleLabel =
    user?.role === "freightOwner"
      ? "Freight Owner"
      : user?.role === "transporter"
        ? "Transporter"
        : "Admin";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B59F78]">
                Admin overview
              </p>
              <h1 className="text-3xl font-bold text-[#2A3663]">
                Welcome back, {user?.fullName || "Administrator"}
              </h1>
              <p className="mt-2 text-gray-600">
                This dashboard is wired to the users, loads, trucks, and shipments saved in local storage for the logged-in admin account.
              </p>
            </div>

            <div className="rounded-full bg-[#F4F4E6] px-3 py-1 text-sm font-medium text-[#2A3663]">
              {user?.email || "admin@tamp.com"} • {adminRoleLabel}
            </div>
          </div>
        </section>

        <DashboardGrid columns={4}>
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle="Registered accounts"
            icon={<FaUsers />}
            color="bg-[#2A3663]"
          />

          <DashboardCard
            title="Freight Owners"
            value={stats.freightOwners}
            subtitle="Active owners"
            icon={<FaUserShield />}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Transporters"
            value={stats.transporters}
            subtitle="Registered carriers"
            icon={<FaTruck />}
            color="bg-emerald-600"
          />

          <DashboardCard
            title="Open Loads"
            value={stats.totalLoads}
            subtitle="Loads in the system"
            icon={<FaBoxOpen />}
            color="bg-yellow-500"
          />
        </DashboardGrid>

        <DashboardGrid columns={4}>
          <DashboardCard
            title="Truck Listings"
            value={stats.totalTrucks}
            subtitle="Registered trucks"
            icon={<FaTruck />}
            color="bg-[#2A3663]"
          />

          <DashboardCard
            title="Requests"
            value={stats.totalRequests}
            subtitle="Matches submitted"
            icon={<FaClipboardList />}
            color="bg-purple-600"
          />

          <DashboardCard
            title="Shipments"
            value={stats.totalShipments}
            subtitle="Tracked shipments"
            icon={<FaChartBar />}
            color="bg-indigo-600"
          />

          <DashboardCard
            title="Delivered"
            value={stats.completedDeliveries}
            subtitle="Completed deliveries"
            icon={<FaChartBar />}
            color="bg-green-600"
          />
        </DashboardGrid>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#2A3663]">Recent registrations</h2>
            <p className="mt-2 text-sm text-gray-600">
              The most recently registered users from local storage are shown here.
            </p>

            <div className="mt-5 space-y-3">
              {recentUsers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                  No registered users found yet.
                </div>
              ) : (
                recentUsers.map((entry) => (
                  <div
                    key={entry.email}
                    className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#2A3663]">{entry.fullName || entry.email}</p>
                      <p className="text-sm text-gray-600">{entry.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {entry.role === "freightOwner"
                          ? "Freight Owner"
                          : entry.role === "transporter"
                            ? "Transporter"
                            : "Admin"}
                      </span>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#2A3663]">Relevant to your account</h2>
            <div className="mt-5 space-y-3 text-sm text-gray-700">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="font-semibold text-[#2A3663]">Signed in as</p>
                <p className="mt-1">{user?.fullName || "Administrator"}</p>
                <p className="text-gray-600">{user?.email || "admin@tamp.com"}</p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="font-semibold text-[#2A3663]">Current platform snapshot</p>
                <p className="mt-1">{stats.totalUsers} registered users</p>
                <p>{stats.totalLoads} loads and {stats.totalShipments} shipments in storage</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
