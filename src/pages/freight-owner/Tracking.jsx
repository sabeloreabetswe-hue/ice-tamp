import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import TrackingTimeline from "../../components/tracking/TrackingTimeline";
import {
  confirmDelivery,
  getShipments,
  updateShipmentStatus,
} from "../../services/shipmentService";

const statusSteps = ["Driver Assigned", "In Transit", "Delivered"];

const FreightOwnerTrackingPage = () => {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShipments();
  }, [user?.email]);

  const loadShipments = () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const allShipments = getShipments();
    const ownerShipments = allShipments.filter(
      (shipment) => shipment.freightOwnerEmail === user.email
    );

    setShipments(ownerShipments);
    setLoading(false);
  };

  const handleStatusChange = (shipment, status) => {
    updateShipmentStatus(shipment.id, status);
    loadShipments();
    alert(`Shipment status updated to "${status}".`);
  };

  const handleConfirmDelivery = (shipment) => {
    const confirmed = window.confirm("Are you sure you want to confirm this delivery?");

    if (!confirmed) {
      return;
    }

    confirmDelivery(shipment.id);
    loadShipments();
    alert("Delivery confirmed successfully.");
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

  const getProgressIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2A3663]">Shipment Tracking</h1>
            <p className="text-gray-500 mt-1">
              Monitor shipment progress and update delivery status from one place.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {shipments.length} shipment{shipments.length === 1 ? "" : "s"} visible
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-500">Loading tracking information...</p>
          </div>
        ) : shipments.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-[#2A3663]">No shipments found</h2>
            <p className="mt-3 text-gray-500">
              Your accepted loads will appear here once a transporter is assigned.
            </p>
          </div>
        ) : (
          shipments.map((shipment) => {
            const currentStep = getProgressIndex(shipment.shipmentStatus);

            return (
              <div key={shipment.id} className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#2A3663]">{shipment.loadTitle}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {shipment.pickup} → {shipment.destination}
                    </p>
                  </div>

                  <span className={`rounded-full px-4 py-1 font-semibold ${getStatusColour(shipment.shipmentStatus)}`}>
                    {shipment.shipmentStatus}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Transporter</p>
                    <p className="font-medium text-[#2A3663]">{shipment.transporterName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium text-[#2A3663]">
                      {shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex flex-wrap gap-2">
                    {statusSteps.map((step, index) => {
                      const isActive = index <= currentStep;
                      const isCurrent = step === shipment.shipmentStatus;

                      return (
                        <div
                          key={step}
                          className={`rounded-full px-3 py-2 text-sm font-medium ${
                            isActive
                              ? "bg-[#2A3663] text-white"
                              : "bg-white text-gray-500"
                          } ${isCurrent ? "ring-2 ring-[#B59F78]" : ""}`}
                        >
                          {step}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <TrackingTimeline history={shipment.trackingHistory || []} />

                {!shipment.deliveryConfirmed && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {statusSteps.map((step) => (
                      <button
                        key={step}
                        onClick={() => handleStatusChange(shipment, step)}
                        className="rounded-xl bg-[#2A3663] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#44507a]"
                      >
                        Mark as {step}
                      </button>
                    ))}

                    {shipment.shipmentStatus === "Delivered" && (
                      <button
                        onClick={() => handleConfirmDelivery(shipment)}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Confirm Delivery
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default FreightOwnerTrackingPage;
