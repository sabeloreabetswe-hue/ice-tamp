import mockLoads from "../data/loads";
import { addActivity } from "./activityService";

const STORAGE_KEY = "tamp_loads";

export const getLoads = () => {
  const loads = localStorage.getItem(STORAGE_KEY);

  if (loads) {
    return JSON.parse(loads);
  }

  // Seed with mock data on first run
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mockLoads)
  );
  return mockLoads;
};

export const saveLoads = (loads) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(loads)
  );
};

export const createLoad = (load) => {
  const loads = getLoads();

  const newLoad = {
    id: crypto.randomUUID(),
    ...load,
    createdAt: new Date().toISOString(),
  };

  loads.push(newLoad);

  saveLoads(loads);

  return newLoad;
};

export const getLoadById = (id) => {
  const loads = getLoads();

  return loads.find(
    (load) => load.id === id
  );
};

export const updateLoad = (updatedLoad) => {
  const loads = getLoads();
  const existingLoad = loads.find((load) => load.id === updatedLoad.id);

  const updatedLoads = loads.map((load) =>
    load.id === updatedLoad.id
      ? {
          ...load,
          ...updatedLoad,
        }
      : load
  );

  saveLoads(updatedLoads);

  addActivity({
    type: "load",
    title: "Load Updated",
    description: `${updatedLoad.title || "Cargo load"} was updated`,
    userEmail: updatedLoad.createdBy || existingLoad?.createdBy,
  });

  return updatedLoad;
};

export const deleteLoad = (id) => {
  const loads = getLoads();
  const loadToDelete = loads.find((load) => load.id === id);

  const updatedLoads = loads.filter(
    (load) => load.id !== id
  );

  saveLoads(updatedLoads);

  if (loadToDelete) {
    addActivity({
      type: "load",
      title: "Load Deleted",
      description: `${loadToDelete.title || "Cargo load"} was deleted`,
      userEmail: loadToDelete.createdBy,
    });
  }

  return updatedLoads;
};
