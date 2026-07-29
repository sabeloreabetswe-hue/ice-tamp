import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getActivities } from "../../services/activityService";

const AuditLog = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = () => {
      const data = getActivities()
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      setActivities(data);
    };

    loadActivities();

    window.addEventListener("storage", loadActivities);
    window.addEventListener("focus", loadActivities);
    window.addEventListener("activities:updated", loadActivities);

    return () => {
      window.removeEventListener("storage", loadActivities);
      window.removeEventListener("focus", loadActivities);
      window.removeEventListener("activities:updated", loadActivities);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B59F78]">Audit trail</p>
            <h1 className="text-3xl font-bold text-[#2A3663]">Audit Log</h1>
            <p className="mt-2 text-gray-600">Review recent platform actions and user management events.</p>
          </div>
          <div className="rounded-full bg-[#F4F4E6] px-3 py-1 text-sm font-medium text-[#2A3663]">
            Signed in as {user?.fullName || "Administrator"}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {activities.length === 0 ? (
            <p className="text-gray-500">No audit records found yet.</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="rounded-2xl border border-gray-200 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-[#2A3663]">{activity.title}</h2>
                      <p className="text-sm text-gray-500">{activity.userEmail || "System"}</p>
                    </div>
                    <p className="text-sm text-gray-400">{activity.createdAt ? new Date(activity.createdAt).toLocaleString() : "Unknown time"}</p>
                  </div>
                  <p className="mt-3 text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLog;
