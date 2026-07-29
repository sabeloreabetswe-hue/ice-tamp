import { useEffect, useState } from "react";
import {
  FaTruck,
  FaCheckCircle,
  FaClipboardList,
  FaShippingFast,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {
  getTransporterStats,
} from "../../services/dashboardService";

import DashboardGrid from "../../components/dashboard/DashboardGrid";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

const TransporterDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalTrucks: 0,
    availableTrucks: 0,
    loadRequests: 0,
    activeShipments: 0,
    completedDeliveries: 0,
  });

  useEffect(() => {
    if (!user) return;

    const dashboardStats = getTransporterStats(user.email);

    setStats(dashboardStats);
  }, [user]);

  return (
    <DashboardLayout>

      <DashboardGrid columns={5}>

        <DashboardCard
          title="Registered Trucks"
          value={stats.totalTrucks}
          subtitle="Registered fleet"
          icon={<FaTruck />}
          color="bg-[#2A3663]"
        />

        <DashboardCard
          title="Available Trucks"
          value={stats.availableTrucks}
          subtitle="Ready for jobs"
          icon={<FaTruck />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Load Requests"
          value={stats.loadRequests}
          subtitle="Requests submitted"
          icon={<FaClipboardList />}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Active Shipments"
          value={stats.activeShipments}
          subtitle="Currently transporting"
          icon={<FaShippingFast />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Completed Deliveries"
          value={stats.completedDeliveries}
          subtitle="Completed successfully"
          icon={<FaCheckCircle />}
          color="bg-emerald-600"
        />

      </DashboardGrid>
        <RecentActivity />
    </DashboardLayout>
  );
};

export default TransporterDashboard;
