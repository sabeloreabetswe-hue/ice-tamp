const STORAGE_KEY = "tamp_verifications";

const createSeedVerifications = () => [
  {
    id: crypto.randomUUID(),
    userEmail: "sam.ndlovu@transit.co",
    userName: "Sam Ndlovu",
    role: "Freight Owner",
    documentsSubmitted: ["ID", "Company Registration", "Bank Statement"],
    status: "Pending",
    submittedAt: new Date().toISOString(),
    notes: "Awaiting admin review",
  },
  {
    id: crypto.randomUUID(),
    userEmail: "maria.choi@haulx.co",
    userName: "Maria Choi",
    role: "Transporter",
    documentsSubmitted: ["ID", "Vehicle Registration", "Insurance"],
    status: "Pending",
    submittedAt: new Date().toISOString(),
    notes: "Insurance document needs confirmation",
  },
  {
    id: crypto.randomUUID(),
    userEmail: "tariq.bek@logistics.af",
    userName: "Tariq Bek",
    role: "Transporter",
    documentsSubmitted: ["ID", "Vehicle Registration"],
    status: "Needs Review",
    submittedAt: new Date().toISOString(),
    notes: "Vehicle registration appears expired",
  },
];

export const getVerifications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const seeded = createSeedVerifications();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
};

const saveVerifications = (verifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));
};

export const updateVerificationStatus = (id, status, notes = "") => {
  const verifications = getVerifications();
  const updated = verifications.map((item) =>
    item.id === id
      ? {
          ...item,
          status,
          notes: notes || item.notes,
          reviewedAt: new Date().toISOString(),
        }
      : item
  );

  saveVerifications(updated);
  return updated.find((item) => item.id === id);
};
