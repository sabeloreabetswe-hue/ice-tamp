import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import FormTitle from "../../components/ui/FormTitle";
import TruckForm from "../../components/forms/TruckForm";

import {
  getTruckById,
  updateTruck,
} from "../../services/truckService";

const EditTruck = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    truckName: "",
    registrationNumber: "",
    truckType: "",
    capacity: "",
    location: "",
    availability: "Available",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const truck = getTruckById(id);

    if (!truck) {
      alert("Truck not found.");
      navigate("/transporter/my-trucks");
      return;
    }

    setFormData(truck);
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.truckName.trim()) {
      newErrors.truckName = "Truck name is required";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber =
        "Registration number is required";
    }

    if (!formData.truckType.trim()) {
      newErrors.truckType = "Truck type is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Current location is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateTruck(formData);

    alert("Truck updated successfully.");

    navigate("/transporter/my-trucks");
  };

  return (
    <DashboardLayout>
      <FormTitle
        title="Edit Truck"
        subtitle="Update your truck information"
      />

      <TruckForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Truck"
      />
    </DashboardLayout>
  );
};

export default EditTruck;
