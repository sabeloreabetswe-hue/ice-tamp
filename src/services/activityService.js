const STORAGE_KEY = "tamp_activity";

// Get all activities
export const getActivities = () => {
  const activities = localStorage.getItem(STORAGE_KEY);

  return activities ? JSON.parse(activities) : [];
};

// Save activities
const saveActivities = (activities) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(activities)
  );
};

// Add activity
export const addActivity = ({
  type,
  title,
  description,
  userEmail,
}) => {
  const activities = getActivities();

  activities.unshift({
    id: crypto.randomUUID(),
    type,
    title,
    description,
    userEmail,
    createdAt: new Date().toISOString(),
  });

  saveActivities(
    activities.slice(0, 30)
  );
};
