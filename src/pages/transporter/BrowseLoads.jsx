import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getLoads } from "../../services/loadService";

import {
  createMatch,
  hasRequestedLoad,
} from "../../services/matchService";

import { useAuth } from "../../context/AuthContext";
import { addActivity } from "../../services/activityService";

const BrowseLoads = () => {
     const { user } = useAuth();
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    loadAllLoads();
  }, []);

  const loadAllLoads = () => {
    const allLoads = getLoads();

    setLoads(allLoads);
  };

  const handleRequestLoad = (load) => {

  createMatch({

    loadId: load.id,

    transporterEmail: user.email,

    transporterName: user.fullName,


    freightOwnerEmail: load.createdBy,

    freightOwnerName: load.ownerName,


    loadTitle: load.title,

    pickup: load.pickup,

    destination: load.destination,

  });



  addActivity({

    type: "match",

    title: "Load Request Submitted",

    description:
      `${load.pickup} → ${load.destination}`,

    userEmail: user.email,

  });



  alert(
    "Load request sent successfully."
  );

};

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        Browse Freight Loads
      </h1>

      {loads.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            No freight loads available.
          </h2>

          <p className="text-gray-500 mt-3">
            Freight Owners have not posted any loads yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {loads.map((load) => (
            <div
              key={load.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2A3663]">
                  {load.title}
                </h2>

                <span className="bg-[#D8DBBD] px-4 py-1 rounded-full">
                  {load.status}
                </span>
              </div>

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

                        <p className="mt-5 text-gray-600">
            {load.description}
            </p>

            {/* Request Load Button */}

                        <div className="mt-6">
            {hasRequestedLoad(user.email, load.id) ? (
                <button
                disabled
                className="
                    px-6
                    py-3
                    rounded-xl
                    bg-gray-400
                    text-white
                    cursor-not-allowed
                "
                >
                Requested
                </button>
            ) : (
                <button
                onClick={() => handleRequestLoad(load)}
                className="
                    px-6
                    py-3
                    rounded-xl
                    bg-[#2A3663]
                    text-white
                    hover:bg-[#1f294d]
                    transition
                "
                >
                Request Load
                </button>
            )}
            </div>
            {/* Additional Information */}

            <div className="grid md:grid-cols-2 gap-3 mt-5 text-sm text-gray-600">
            <p>
                <strong>Freight Owner:</strong>{" "}
                {load.ownerName}
            </p>

            <p>
                <strong>Posted:</strong>{" "}
                {load.createdAt
                ? new Date(load.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            </div>
                                </div>
                            ))}
                            </div>
                        )}
                        </DashboardLayout>
                    );
                    };

            export default BrowseLoads;
