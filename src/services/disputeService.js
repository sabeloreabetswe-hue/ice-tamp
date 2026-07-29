const STORAGE_KEY = "tamp_disputes";

// Get all disputes
export const getDisputes = () => {
  const disputes = localStorage.getItem(STORAGE_KEY);
  return disputes ? JSON.parse(disputes) : [];
};

// Save disputes
const saveDisputes = (disputes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(disputes));
};

// Create dispute
export const createDispute = (dispute) => {
  const disputes = getDisputes();
  const newDispute = {
    id: crypto.randomUUID(),
    ...dispute,
    status: "Open",
    createdAt: new Date().toISOString(),
  };

  disputes.push(newDispute);
  saveDisputes(disputes);
  return newDispute;
};

// Update dispute status
export const updateDisputeStatus = (id, status, action = "reviewed") => {
  const disputes = getDisputes();
  const updatedDisputes = disputes.map((dispute) =>
    dispute.id === id
      ? { ...dispute, status, action, reviewedAt: new Date().toISOString() }
      : dispute
  );

  saveDisputes(updatedDisputes);
  return updatedDisputes.find((dispute) => dispute.id === id);
};
