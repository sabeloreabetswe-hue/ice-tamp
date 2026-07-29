import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getLoads,
  deleteLoad,
} from "../../services/loadService";
import { useAuth } from "../../context/AuthContext";

const ViewLoads = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loads, setLoads] = useState([]);

  const loadUserLoads = useCallback(() => {
    const allLoads = getLoads();

    const userLoads = allLoads.filter(
      (load) => load.createdBy === user?.email
    );

    setLoads(userLoads);
  }, [user?.email]);

  useEffect(() => {
    loadUserLoads();
  }, [loadUserLoads]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cargo load?"
    );

    if (!confirmed) return;

    deleteLoad(id);

    loadUserLoads();

    alert("Cargo load deleted successfully.");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        My Cargo Loads
      </h1>

      {loads.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            You haven't created any cargo loads yet.
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first freight load to start receiving transporter
            matches.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {loads.map((load) => (
            <div
              key={load.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2A3663]">
                  {load.title}
                </h2>

                <span className="bg-[#D8DBBD] px-4 py-1 rounded-full font-medium">
                  {load.status}
                </span>
              </div>

              {/* Load Details */}
              <div className="grid md:grid-cols-2 gap-3 mt-5">
                <p>
                  <strong>Pickup:</strong> {load.pickup}
                </p>

                <p>
                  <strong>Destination:</strong> {load.destination}
                </p>

                <p>
                  <strong>Weight:</strong> {load.weight} kg
                </p>

                <p>
                  <strong>Truck Type:</strong> {load.truckType}
                </p>

                <p>
                  <strong>Pickup Date:</strong> {load.pickupDate}
                </p>

                <p>
                  <strong>Delivery Date:</strong> {load.deliveryDate}
                </p>
              </div>

              {/* Description */}
              <p className="mt-5 text-gray-600">
                {load.description}
              </p>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-3 mt-5 text-sm text-gray-600">
                <p>
                  <strong>Created By:</strong> {load.ownerName}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {load.createdAt
                    ? new Date(load.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(`/freight-owner/edit-load/${load.id}`)
                  }
                  className="
                    px-5
                    py-2
                    rounded-xl
                    bg-[#2A3663]
                    text-white
                    hover:bg-[#1f294d]
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(load.id)}
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
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewLoads;
