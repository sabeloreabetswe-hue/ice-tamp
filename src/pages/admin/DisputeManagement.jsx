import { getDisputes, updateDisputeStatus } from "../../services/disputeService";
import { useState } from "react";

const DisputeManagement = () => {
  const [disputes, setDisputes] = useState(getDisputes());

  const handleAction = (id, status, action) => {
    updateDisputeStatus(id, status, action);
    setDisputes(getDisputes());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold text-[#2A3663] mb-5">Disputes / Flags</h2>

      {disputes.length === 0 ? (
        <p className="text-gray-500">No disputes reported.</p>
      ) : (
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute.id} className="border rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{dispute.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{dispute.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Reported by: {dispute.userEmail}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {dispute.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAction(dispute.id, "Investigating", "reviewed")}
                  className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm"
                >
                  Investigate
                </button>
                <button
                  onClick={() => handleAction(dispute.id, "Resolved", "resolved")}
                  className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleAction(dispute.id, "Removed", "removed")}
                  className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm"
                >
                  Remove Content
                </button>
                <button
                  onClick={() => handleAction(dispute.id, "Blocked", "blocked")}
                  className="px-3 py-2 rounded-lg bg-gray-800 text-white text-sm"
                >
                  Block User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisputeManagement;
