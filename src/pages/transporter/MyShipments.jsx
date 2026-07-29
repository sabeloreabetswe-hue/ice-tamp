import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { getShipments } from "../../services/shipmentService";

const MyShipments = () => {
  const { user } = useAuth();

  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = () => {
    const allShipments = getShipments();

    const myShipments = allShipments.filter(
      (shipment) => shipment.transporterEmail === user.email
    );

    setShipments(myShipments);
  };

  const getStatusColour = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Driver Assigned":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        My Shipments
      </h1>

      {shipments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#2A3663]">
            No shipments assigned yet.
          </h2>

          <p className="text-gray-500 mt-3">
            Accepted freight requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#2A3663]">
                  {shipment.loadTitle}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full font-semibold ${getStatusColour(
                    shipment.shipmentStatus
                  )}`}
                >
                  {shipment.shipmentStatus}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-5">
                <p>
                  <strong>Pickup:</strong> {shipment.pickup}
                </p>

                <p>
                  <strong>Destination:</strong> {shipment.destination}
                </p>

                <p>
                  <strong>Freight Owner:</strong>{" "}
                  {shipment.freightOwnerName}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyShipments;
