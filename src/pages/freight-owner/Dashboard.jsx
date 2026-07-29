import {
  FaBoxOpen,
  FaTruck,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import DashboardSection from "../../components/dashboard/DashboardSection";

import { useAuth } from "../../context/AuthContext";
import { getFreightOwnerStats } from "../../services/dashboardService";
import RecentActivity from "../../components/dashboard/RecentActivity";


const FreightOwnerDashboard = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalLoads: 0,
    activeLoads: 0,
    pendingRequests: 0,
    activeShipments: 0,
    completedDeliveries: 0,
  });


  useEffect(() => {

    if (!user) return;


    const dashboardStats =
      getFreightOwnerStats(
        user.email
      );


    setStats(dashboardStats);


  }, [user]);


  return (
    <DashboardLayout>

      <DashboardGrid columns={4}>


        <DashboardCard
  title="Total Loads"
  value={stats.totalLoads}
  subtitle="Freight loads created"
  icon={<FaBoxOpen />}
/>


        <DashboardCard
          title="Active Loads"
          value={stats.activeLoads}
          icon={<FaTruck />}
          subtitle="Currently open"
          color="bg-green-600"
        />


        <DashboardCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={<FaClock />}
          subtitle="Waiting for review"
          color="bg-yellow-500"
        />


        <DashboardCard
          title="Completed Deliveries"
          value={stats.completedDeliveries}
          icon={<FaCheckCircle />}
          color="bg-blue-600"
        />


      </DashboardGrid>

        <RecentActivity />


    </DashboardLayout>
  );
};


export default FreightOwnerDashboard;
