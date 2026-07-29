import { getLoads } from "./loadService";
import { getTrucks } from "./truckService";
import { getShipments } from "./shipmentService";
import { getMatches } from "./matchService";
import { getUsers } from "./authService";

// Shared helper for dashboard calculations.
const isDelivered = (shipment) => shipment.shipmentStatus === "Delivered";

export const getFreightOwnerStats = (email) => {
  const loads = getLoads().filter((load) => load.createdBy === email);
  const matches = getMatches().filter((match) => match.freightOwnerEmail === email);
  const shipments = getShipments().filter((shipment) => shipment.freightOwnerEmail === email);

  return {
    totalLoads: loads.length,
    activeLoads: loads.filter((load) => load.status !== "Completed").length,
    pendingRequests: matches.filter((match) => match.status === "Pending").length,
    activeShipments: shipments.filter((shipment) => !isDelivered(shipment)).length,
    completedDeliveries: shipments.filter(isDelivered).length,
  };
};

export const getTransporterStats = (email) => {
  const trucks = getTrucks().filter((truck) => truck.createdBy === email);
  const matches = getMatches().filter((match) => match.transporterEmail === email);
  const shipments = getShipments().filter((shipment) => shipment.transporterEmail === email);

  return {
    totalTrucks: trucks.length,
    availableTrucks: trucks.filter((truck) => truck.availability === "Available").length,
    loadRequests: matches.length,
    activeShipments: shipments.filter((shipment) => !isDelivered(shipment)).length,
    completedDeliveries: shipments.filter(isDelivered).length,
  };
};

export const getAdminStats = () => {
  const users = getUsers();
  const loads = getLoads();
  const trucks = getTrucks();
  const matches = getMatches();
  const shipments = getShipments();

  return {
    totalUsers: users.length,
    freightOwners: users.filter((user) => user.role === "freightOwner").length,
    transporters: users.filter((user) => user.role === "transporter").length,
    totalLoads: loads.length,
    totalTrucks: trucks.length,
    totalRequests: matches.length,
    totalShipments: shipments.length,
    completedDeliveries: shipments.filter(isDelivered).length,
  };
};
