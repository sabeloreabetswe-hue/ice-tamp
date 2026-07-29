import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import {
  getTrucks,
  deleteTruck,
} from "../../services/truckService";

const ViewTrucks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trucks, setTrucks] = useState([]);

  // Load logged-in user's trucks
  const loadUserTrucks = () => {
    const allTrucks = getTrucks();

    const userTrucks = allTrucks.filter(
      (truck) => truck.createdBy === user.email
    );

    setTrucks(userTrucks);
  };

  // Load trucks when the page opens
  useEffect(() => {
    loadUserTrucks();
  }, []);

  // Delete truck
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this truck?"
    );

    if (!confirmed) {
      return;
    }

    deleteTruck(id);

    loadUserTrucks();

    alert("Truck deleted successfully.");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        My Trucks
      </h1>

      {trucks.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            No trucks registered yet.
          </h2>

          <p className="text-gray-500 mt-3">
            Register your first truck to receive freight opportunities.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {trucks.map((truck) => (
            <div
              key={truck.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2A3663]">
                  {truck.truckName}
                </h2>

                <span className="bg-[#D8DBBD] px-4 py-1 rounded-full">
                  {truck.status}
                </span>
              </div>

              {/* Truck Details */}
              <div className="grid md:grid-cols-2 gap-3 mt-5">
                <p>
                  <strong>Registration:</strong>{" "}
                  {truck.registrationNumber}
                </p>

                <p>
                  <strong>Truck Type:</strong>{" "}
                  {truck.truckType}
                </p>

                <p>
                  <strong>Capacity:</strong>{" "}
                  {truck.capacity} kg
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {truck.location}
                </p>

                <p>
                  <strong>Availability:</strong>{" "}
                  {truck.availability}
                </p>

                <p>
                  <strong>Registered:</strong>{" "}
                  {truck.createdAt
                    ? new Date(
                        truck.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(
                      `/transporter/edit-truck/${truck.id}`
                    )
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
                  onClick={() => handleDelete(truck.id)}
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

export default ViewTrucks;
