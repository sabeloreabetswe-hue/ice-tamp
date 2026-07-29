import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import { getMatches } from "../../services/matchService";

const MyRequests = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const matches = getMatches();

    const transporterRequests = matches.filter(
      (match) => match.transporterEmail === user.email
    );

    setRequests(transporterRequests);
  };

  const getStatusColour = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        My Load Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            No requests submitted.
          </h2>

          <p className="text-gray-500 mt-3">
            Browse freight loads and submit your first request.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2A3663]">
                  {request.loadTitle}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full font-semibold ${getStatusColour(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <p>
                  <strong>Pickup:</strong> {request.pickup}
                </p>

                <p>
                  <strong>Destination:</strong> {request.destination}
                </p>

                <p>
                  <strong>Freight Owner:</strong>{" "}
                  {request.freightOwnerName}
                </p>

                <p>
                  <strong>Requested:</strong>{" "}
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyRequests;
