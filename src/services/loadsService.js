const STORAGE_KEY = "tamp_loads";

export const getLoads = () => {
  const loads = localStorage.getItem(STORAGE_KEY);

  return loads ? JSON.parse(loads) : [];
};

export const saveLoads = (loads) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(loads)
  );
};
