import { getUsers } from "./userService";
import { getLoads } from "./loadService";
import { getTrucks } from "./truckService";
import { getShipments } from "./shipmentService";
import { getActivities } from "./activityService";

const SETTINGS_KEY = "tamp_admin_settings";

const defaultAdminSettings = {
  allowRegistration: true,
  maintenanceMode: false,
  requireVerification: true,
  autoApproveLoads: false,
  maxLoadsPerOwner: 10,
  maxActiveShipmentsPerTransporter: 5,
  auditRetentionDays: 180,
  defaultCommissionRate: 5,
  emailNotifications: true,
  weeklyReports: true,
  allowDisputes: true,
};

export const getAdminSettings = () => {
  const storedSettings = localStorage.getItem(SETTINGS_KEY);

  if (!storedSettings) {
    return defaultAdminSettings;
  }

  try {
    return {
      ...defaultAdminSettings,
      ...JSON.parse(storedSettings),
    };
  } catch (error) {
    console.error("Unable to parse admin settings", error);
    return defaultAdminSettings;
  }
};

export const saveAdminSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  return getAdminSettings();
};

export const resetAdminSettings = () => {
  localStorage.removeItem(SETTINGS_KEY);
  return defaultAdminSettings;
};

// Admin KPI statistics

export const getAdminStats = () => {


const users = getUsers();

const loads = getLoads();

const trucks = getTrucks();

const shipments = getShipments();

const activities = getActivities();



  return {
    totalUsers: users.length,
    freightOwners: users.filter((user) => user.role === "freightOwner").length,
    transporters: users.filter((user) => user.role === "transporter").length,
    totalLoads: loads.length,



totalTrucks:
trucks.length,



totalShipments:
shipments.length,



completedDeliveries:
shipments.filter(
(shipment)=>
shipment.shipmentStatus === "Delivered"
).length,



totalActivities:
activities.length


};


};
