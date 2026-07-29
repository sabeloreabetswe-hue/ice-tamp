import { useState } from "react";

import { FaStar } from "react-icons/fa";

import {
  createRating,
  hasRatedShipment,
  hasRatedShipmentByRater,
  getShipmentRatings,
} from "../../services/ratingService";
import { addActivity } from "../../services/activityService";

/**
 * RatingForm
 *
 * A reusable form that lets a user rate a completed shipment.
 * Works for both transporters and freight owners.
 *
 * Props:
 *   - shipment:               The shipment object to rate
 *   - raterEmail:             (optional) Email of the rater (for freight owners)
 *   - raterName:              (optional) Name of the rater (for freight owners)
 *   - onRatingSubmitted:      Callback fired after a rating is created
 *   - showExisting:           If true, displays existing ratings below the form
 */
const RatingForm = ({
  shipment,
  raterEmail,
  raterName,
  onRatingSubmitted,
  showExisting = true,
}) => {
  const [score, setScore] = useState(5);
  const [hoverScore, setHoverScore] = useState(0);
  const [comment, setComment] = useState("");

  // Check if this specific rater has already rated the shipment
  const alreadyRated = raterEmail
    ? hasRatedShipmentByRater(shipment.id, raterEmail)
    : hasRatedShipment(shipment.id);

  const existingRatings = showExisting
    ? getShipmentRatings(shipment.id)
    : [];

  const handleSubmit = () => {
    if (alreadyRated) {
      alert("You already rated this shipment.");
      return;
    }

    createRating({
      shipmentId: shipment.id,
      raterEmail: raterEmail || shipment.transporterEmail,
      raterName: raterName || shipment.transporterName,
      raterRole: raterEmail ? "freightOwner" : "transporter",
      score,
      comment,
    });

    addActivity({
      type: "rating",
      title: "Shipment Rated",
      description: `Rating submitted for ${shipment.loadTitle || shipment.id}`,
      userEmail: raterEmail || shipment.transporterEmail,
    });

    alert("Rating submitted successfully.");

    setComment("");
    setScore(5);

    if (onRatingSubmitted) {
      onRatingSubmitted();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-[#2A3663] mb-4">
        Rate This Trip
      </h2>

      {alreadyRated ? (
        <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-green-700 font-medium">
            You have already rated this shipment.
          </p>
        </div>
      ) : (
        <>
          {/* Star Rating Selector */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setScore(star)}
                  onMouseEnter={() => setHoverScore(star)}
                  onMouseLeave={() => setHoverScore(0)}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={`text-2xl transition-colors ${
                      star <= (hoverScore || score)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Comment (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this shipment..."
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-[#B59F78] resize-none"
              rows="4"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={alreadyRated}
            className="w-full px-5 py-3 rounded-xl bg-[#2A3663] text-white font-semibold hover:bg-[#1f294d] transition disabled:opacity-50"
          >
            Submit Rating
          </button>
        </>
      )}

      {/* Existing Ratings */}
      {showExisting && existingRatings.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#2A3663] mb-3">
            Existing Ratings
          </h3>
          <div className="space-y-3">
            {existingRatings.map((rating) => (
              <div
                key={rating.id}
                className="p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-yellow-400">
                    {[...Array(rating.score)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="text-gray-700 text-sm">
                    {rating.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingForm;
