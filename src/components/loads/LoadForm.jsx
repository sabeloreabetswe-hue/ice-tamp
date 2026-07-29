import Input from "../ui/Input";
import Button from "../ui/Button";

import {
  FaBox,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaTruck,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

const LoadForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText = "Create Load",
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-gray-200
          p-8
        "
      >
      
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cargo Title */}
          <Input
            label="Cargo Title"
            name="title"
            placeholder="e.g. Electronics"
            value={formData.title}
            onChange={handleChange}
            icon={<FaBox />}
            error={errors.title}
          />

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Pickup Location"
              name="pickup"
              placeholder="Johannesburg"
              value={formData.pickup}
              onChange={handleChange}
              icon={<FaMapMarkerAlt />}
              error={errors.pickup}
            />

            <Input
              label="Destination"
              name="destination"
              placeholder="Cape Town"
              value={formData.destination}
              onChange={handleChange}
              icon={<FaMapMarkerAlt />}
              error={errors.destination}
            />
          </div>

          {/* Weight & Truck Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              placeholder="2500"
              value={formData.weight}
              onChange={handleChange}
              icon={<FaWeightHanging />}
              error={errors.weight}
            />

            <Input
              label="Required Truck Type"
              name="truckType"
              placeholder="Flatbed, Tautliner, Refrigerated..."
              value={formData.truckType}
              onChange={handleChange}
              icon={<FaTruck />}
              error={errors.truckType}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Pickup Date"
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              icon={<FaCalendarAlt />}
              error={errors.pickupDate}
            />

            <Input
              label="Delivery Date"
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              icon={<FaCalendarAlt />}
              error={errors.deliveryDate}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <Button
              type="submit"
              icon={<FaArrowRight />}
              className="w-full md:w-auto px-10"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadForm;
