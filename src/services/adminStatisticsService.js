import { getLoads } from "./loadService";
import { getTrucks } from "./truckService";
import { getMatches } from "./matchService";
import { getShipments } from "./shipmentService";
import { getRatings } from "./ratingService";

export const getUserStatistics = (email) => {
  const loads = getLoads();
  const trucks = getTrucks();
  const matches = getMatches();
  const shipments = getShipments();
  const ratings = getRatings();

  const userLoads = loads.filter(
    (load) => load.createdBy === email
  );

  const userTrucks = trucks.filter(
    (truck) => truck.createdBy === email
  );

  const userRequests = matches.filter(
    (match) => match.transporterEmail === email
  );

  const userShipments = shipments.filter(
    (shipment) =>
      shipment.freightOwnerEmail === email ||
      shipment.transporterEmail === email
  );

  const completedDeliveries = userShipments.filter(
    (shipment) =>
      shipment.shipmentStatus === "Delivered"
  );

  const userRatings = ratings.filter(
    (rating) =>
      rating.transporterEmail === email
  );

  const averageRating =
    userRatings.length === 0
      ? 0
      : (
          userRatings.reduce(
            (sum, rating) => sum + rating.score,
            0
          ) / userRatings.length
        ).toFixed(1);

  return {
    loads: userLoads.length,
    trucks: userTrucks.length,
    matches: userRequests.length,
    shipments: userShipments.length,
    ratings: userRatings.length,
    completedDeliveries: completedDeliveries.length,
    averageRating,
  };
};