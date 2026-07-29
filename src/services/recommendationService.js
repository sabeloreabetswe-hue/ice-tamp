import { getTrucks } from "./truckService";
import { calculateMatchScore } from "./matchService";
import { getLoads } from "./loadService";

export const getRecommendedTrucks = (load) => {
  const trucks = getTrucks();

  return trucks
    .map((truck) => ({
      ...truck,
      compatibility: calculateMatchScore(load, truck),
    }))
    .filter((truck) => truck.compatibility >= 50)
    .sort((a, b) => b.compatibility - a.compatibility);
};

export const getRecommendations = () => {
  const loads = getLoads();
  const trucks = getTrucks();

  const recommendations = [];

  loads.forEach((load) => {
    trucks.forEach((truck) => {
      const score = calculateMatchScore(load, truck);

      if (score >= 60) {
        recommendations.push({ load, truck, score });
      }
    });
  });

  return recommendations;
};

export default {};
