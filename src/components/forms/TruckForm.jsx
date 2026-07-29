import Input from "../ui/Input";
import Button from "../ui/Button";

import {
  FaTruck,
  FaHashtag,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClipboardList,
} from "react-icons/fa";

const TruckForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  buttonText = "Register Truck",
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div
        className="
          bg-white
          rounded-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          border
          border-gray-100
          overflow-hidden
        "
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Truck Name"
              name="truckName"
              placeholder="Scania R500"
              value={formData.truckName}
              onChange={handleChange}
              icon={<FaTruck />}
              error={errors.truckName}
            />

            <Input
              label="Registration Number"
              name="registrationNumber"
              placeholder="CA 123-456"
              value={formData.registrationNumber}
              onChange={handleChange}
              icon={<FaHashtag />}
              error={errors.registrationNumber}
            />

            <Input
              label="Truck Type"
              name="truckType"
              placeholder="Flatbed, Refrigerated..."
              value={formData.truckType}
              onChange={handleChange}
              icon={<FaClipboardList />}
              error={errors.truckType}
            />

            <Input
              label="Capacity (kg)"
              type="number"
              name="capacity"
              placeholder="30000"
              value={formData.capacity}
              onChange={handleChange}
              icon={<FaWeightHanging />}
              error={errors.capacity}
            />

            <Input
              label="Current Location"
              name="location"
              placeholder="Johannesburg"
              value={formData.location}
              onChange={handleChange}
              icon={<FaMapMarkerAlt />}
              error={errors.location}
            />

            {/* Availability */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Availability
              </label>

              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-300
                  bg-gray-50
                  px-4
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#B59F78]
                  focus:border-[#B59F78]
                "
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              {errors.availability && (
                <p className="text-sm text-red-500">
                  {errors.availability}
                </p>
              )}
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end">
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

export default TruckForm;
