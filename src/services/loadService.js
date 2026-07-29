import mockLoads from "../data/loads";

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

  const updatedLoads = loads.map((load) =>
    load.id === updatedLoad.id
      ? {
          ...load,
          ...updatedLoad,
        }
      : load
  );

  saveLoads(updatedLoads);

  return updatedLoad;
};

export const deleteLoad = (id) => {
  const loads = getLoads();

  const updatedLoads = loads.filter(
    (load) => load.id !== id
  );

  saveLoads(updatedLoads);

  return updatedLoads;
};
