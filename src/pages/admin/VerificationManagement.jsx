import { useEffect, useState } from "react";
import { getVerifications, updateVerificationStatus } from "../../services/verificationService";

const VerificationManagement = () => {
  const [verifications, setVerifications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    setVerifications(getVerifications());
  }, []);

  const handleAction = (id, status) => {
    updateVerificationStatus(id, status);
    setVerifications(getVerifications());
  };

  const filtered = verifications.filter((item) => {
    if (selectedStatus === "All") return true;
    return item.status === selectedStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#2A3663]">Verification Requests</h2>
          <p className="text-sm text-gray-500">Review account verification submissions and approve or reject them.</p>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Needs Review">Needs Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No verification requests found.</p>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="border rounded-xl p-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[#2A3663]">{item.userName}</h3>
                  <p className="text-sm text-gray-600">{item.userEmail}</p>
                  <p className="text-sm text-gray-500">Role: {item.role}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm w-fit">
                  {item.status}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium">Documents submitted</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.documentsSubmitted.map((doc) => (
                    <span key={doc} className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">{item.notes}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleAction(item.id, "Approved")}
                  className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(item.id, "Needs Review")}
                  className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm"
                >
                  Needs Review
                </button>
                <button
                  onClick={() => handleAction(item.id, "Rejected")}
                  className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerificationManagement;
