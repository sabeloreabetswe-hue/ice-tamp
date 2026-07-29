import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import LoadForm from "../../components/loads/LoadForm";

import {
  getLoadById,
  updateLoad,
} from "../../services/loadService";

const EditLoad = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    pickup: "",
    destination: "",
    weight: "",
    truckType: "",
    pickupDate: "",
    deliveryDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = getLoadById(id);

    if (!load) {
      navigate("/freight-owner/loads");
      return;
    }

    setFormData(load);
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Required";
    if (!formData.pickup) newErrors.pickup = "Required";
    if (!formData.destination) newErrors.destination = "Required";
    if (!formData.weight) newErrors.weight = "Required";
    if (!formData.truckType) newErrors.truckType = "Required";
    if (!formData.pickupDate) newErrors.pickupDate = "Required";
    if (!formData.deliveryDate) newErrors.deliveryDate = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    updateLoad(formData);

    navigate("/freight-owner/loads");
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#2A3663] mb-8">
        Edit Cargo Load
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <LoadForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Update Load"
        />

      </div>

    </DashboardLayout>
  );
};

export default EditLoad;
