import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import {
  getMatches,
  updateMatch,
} from "../../services/matchService";

import {
  createShipment,
  shipmentExists,
} from "../../services/shipmentService";

const LoadRequests = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const matches = getMatches();

    const ownerRequests = matches.filter(
      (match) => match.freightOwnerEmail === user.email
    );

    setRequests(ownerRequests);
  };

  const handleStatusChange = (request, status) => {
  updateMatch({
    ...request,
    status,
  });

  if (
  status === "Accepted" &&
  !shipmentExists(request.loadId, request.transporterEmail)
) {
  createShipment({
    loadId: request.loadId,
    loadTitle: request.loadTitle,
    pickup: request.pickup,
    destination: request.destination,
    freightOwnerEmail: request.freightOwnerEmail,
    freightOwnerName: request.freightOwnerName,
    transporterEmail: request.transporterEmail,
    transporterName: request.transporterName,
  });
  }

  loadRequests();

  alert(`Request ${status.toLowerCase()} successfully.`);
};

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        Load Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            No load requests yet.
          </h2>

          <p className="text-gray-500 mt-3">
            Transporters will appear here once they request one of your loads.
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

                <span className="bg-[#D8DBBD] px-4 py-1 rounded-full">
                  {request.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-5">
                <p>
                  <strong>Transporter:</strong>{" "}
                  {request.transporterName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {request.transporterEmail}
                </p>

                <p>
                  <strong>Pickup:</strong>{" "}
                  {request.pickup}
                </p>

                <p>
                  <strong>Destination:</strong>{" "}
                  {request.destination}
                </p>

                <p>
                  <strong>Requested:</strong>{" "}
                  {request.createdAt
                    ? new Date(
                        request.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    handleStatusChange(
                      request,
                      "Accepted"
                    )
                  }
                  className="
                    px-5
                    py-2
                    rounded-xl
                    bg-green-600
                    text-white
                    hover:bg-green-700
                    transition
                  "
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(
                      request,
                      "Rejected"
                    )
                  }
                  className="
                    px-5
                    py-2
                    rounded-xl
                    bg-red-600
                    text-white
                    hover:bg-red-700
                    transition
                  "
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default LoadRequests;
