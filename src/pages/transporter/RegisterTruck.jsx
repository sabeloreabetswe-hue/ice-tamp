import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import FormTitle from "../../components/ui/FormTitle";
import TruckForm from "../../components/forms/TruckForm";

import { createTruck } from "../../services/truckService";
import { addActivity } from "../../services/activityService";

import { useAuth } from "../../context/AuthContext";


const RegisterTruck = () => {

  const navigate = useNavigate();

  const { user } = useAuth();


  const [formData, setFormData] = useState({

    truckName: "",
    registrationNumber: "",
    truckType: "",
    capacity: "",
    location: "",
    availability: "Available",

  });



  const [errors, setErrors] = useState({});



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

      newErrors.truckName =
        "Truck name is required";

    }


    if (!formData.registrationNumber.trim()) {

      newErrors.registrationNumber =
        "Registration number is required";

    }


    if (!formData.truckType.trim()) {

      newErrors.truckType =
        "Truck type is required";

    }


    if (!formData.capacity) {

      newErrors.capacity =
        "Capacity is required";

    }


    if (!formData.location.trim()) {

      newErrors.location =
        "Current location is required";

    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;

  };



  const handleSubmit = (event) => {

    event.preventDefault();



    if (!validateForm()) {

      return;

    }



    // Save truck
    createTruck({

      ...formData,

      status: "Available",

      createdBy: user.email,

      ownerName: user.fullName,

    });



    // Save activity
    addActivity({

      type: "truck",

      title: "New Truck Registered",

      description:
        `${formData.truckName} - ${formData.location}`,

      userEmail: user.email,

    });



    alert(
      "Truck registered successfully."
    );


    navigate(
      "/transporter/my-trucks"
    );

  };



  return (

    <DashboardLayout>

      <FormTitle

        title="Register Truck"

        subtitle="Add your truck to the marketplace"

      />


      <TruckForm

        formData={formData}

        errors={errors}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        buttonText="Register Truck"

      />


    </DashboardLayout>

  );

};



export default RegisterTruck;
