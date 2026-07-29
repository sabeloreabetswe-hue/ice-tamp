import { useEffect, useState } from "react";

import { FaStar, FaShippingFast } from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import RatingForm from "../../components/ratings/RatingForm";

import { useAuth } from "../../context/AuthContext";
import { getShipments } from "../../services/shipmentService";
import { getRatingsByTransporter } from "../../services/ratingService";

const Ratings = () => {
  const { user } = useAuth();

  const [deliveredShipments, setDeliveredShipments] = useState([]);
  const [myRatings, setMyRatings] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allShipments = getShipments();

    // Shipments assigned to this transporter that are delivered
    const delivered = allShipments.filter(
      (s) =>
        s.transporterEmail === user.email &&
        s.shipmentStatus === "Delivered"
    );

    setDeliveredShipments(delivered);

    // All ratings given by this transporter
    const ratings = getRatingsByTransporter(user.email);
    setMyRatings(ratings);
  };

  const handleRatingSubmitted = () => {
    // Refresh ratings list after a new rating is submitted
    loadData();
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        Rate Your Shipments
      </h1>

      {/* Delivered Shipments to Rate */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#2A3663] mb-4">
          Completed Shipments
        </h2>

        {deliveredShipments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <FaShippingFast className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2A3663] mb-2">
              No completed shipments yet.
            </h3>
            <p className="text-gray-500">
              Completed shipments will appear here so you can
              rate your experience.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {deliveredShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#2A3663]">
                    {shipment.loadTitle}
                  </h3>
                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    {shipment.shipmentStatus}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
                  <p>
                    <strong>Pickup:</strong>{" "}
                    {shipment.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong>{" "}
                    {shipment.destination}
                  </p>
                  <p>
                    <strong>Freight Owner:</strong>{" "}
                    {shipment.freightOwnerName}
                  </p>
                  <p>
                    <strong>Delivered:</strong>{" "}
                    {shipment.deliveredAt
                      ? new Date(
                          shipment.deliveredAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <RatingForm
                  shipment={shipment}
                  onRatingSubmitted={handleRatingSubmitted}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Ratings Given by This Transporter */}
      <section>
        <h2 className="text-xl font-semibold text-[#2A3663] mb-4">
          Your Ratings
        </h2>

        {myRatings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <p className="text-gray-500">
              You haven't rated any shipments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myRatings
              .slice()
              .reverse()
              .map((rating) => (
                <div
                  key={rating.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#2A3663]">
                        Shipment: {rating.shipmentId}
                      </h3>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(rating.score)].map(
                          (_, i) => (
                            <FaStar key={i} />
                          )
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(
                        rating.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {rating.comment && (
                    <p className="mt-3 text-gray-700">
                      {rating.comment}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Ratings;
