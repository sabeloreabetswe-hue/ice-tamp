import { addActivity } from "./activityService";

const STORAGE_KEY = "tamp_trucks";

// Get all trucks
export const getTrucks = () => {
  const trucks = localStorage.getItem(STORAGE_KEY);

  return trucks ? JSON.parse(trucks) : [];
};

// Save trucks
export const saveTrucks = (trucks) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trucks)
  );
};

// Create truck
export const createTruck = (truck) => {
  const trucks = getTrucks();

  const newTruck = {
    id: crypto.randomUUID(),
    ...truck,
    createdAt: new Date().toISOString(),
  };

  trucks.push(newTruck);

  saveTrucks(trucks);

  return newTruck;
};

// Get one truck
export const getTruckById = (id) => {
  const trucks = getTrucks();

  return trucks.find(
    (truck) => truck.id === id
  );
};

// Update truck
export const updateTruck = (updatedTruck) => {
  const trucks = getTrucks();

  const updatedTrucks = trucks.map((truck) =>
    truck.id === updatedTruck.id
      ? {
          ...truck,
          ...updatedTruck,
        }
      : truck
  );

  saveTrucks(updatedTrucks);

  addActivity({
    type: "truck",
    title: "Truck Updated",
    description: `${updatedTruck.truckName || "Truck"} was updated`,
    userEmail: updatedTruck.createdBy,
  });

  return updatedTruck;
};

// Delete truck
export const deleteTruck = (id) => {
  const trucks = getTrucks();
  const truckToDelete = trucks.find((truck) => truck.id === id);

  const updatedTrucks = trucks.filter(
    (truck) => truck.id !== id
  );

  saveTrucks(updatedTrucks);

  if (truckToDelete) {
    addActivity({
      type: "truck",
      title: "Truck Deleted",
      description: `${truckToDelete.truckName || "Truck"} was deleted`,
      userEmail: truckToDelete.createdBy,
    });
  }

  return updatedTrucks;
};
