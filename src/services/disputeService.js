const STORAGE_KEY = "tamp_disputes";

export const getDisputes = () => {
  const disputes = localStorage.getItem(STORAGE_KEY);

  return disputes ? JSON.parse(disputes) : [];
};

const saveDisputes = (disputes) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(disputes)
  );
};

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

export const resolveDispute = (id) => {
  const disputes = getDisputes();

  const updated = disputes.map((dispute) =>
    dispute.id === id
      ? {
          ...dispute,
          status: "Resolved",
          resolvedAt: new Date().toISOString(),
        }
      : dispute
  );

  saveDisputes(updated);
};

export const rejectDispute = (id) => {
  const disputes = getDisputes();

  const updated = disputes.map((dispute) =>
    dispute.id === id
      ? {
          ...dispute,
          status: "Rejected",
        }
      : dispute
  );

  saveDisputes(updated);
};

// Generic status updater used by admin UI
export const updateDisputeStatus = (id, status, action = "") => {
  const disputes = getDisputes();

  const updated = disputes.map((dispute) =>
    dispute.id === id
      ? {
          ...dispute,
          status,
          lastAction: action || dispute.lastAction,
          updatedAt: new Date().toISOString(),
        }
      : dispute
  );

  saveDisputes(updated);

  return updated;
};