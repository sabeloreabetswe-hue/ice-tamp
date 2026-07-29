import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import LoadForm from "../../components/loads/LoadForm";

import { useAuth } from "../../context/AuthContext";

import { createLoad } from "../../services/loadService";
import { addActivity } from "../../services/activityService";


const requiredFields = [
  "title",
  "weight",
  "pickup",
  "destination",
  "truckType",
  "pickupDate",
  "deliveryDate",
];


const CreateLoad = () => {

  const navigate = useNavigate();

  const { user } = useAuth();


  const [formData, setFormData] = useState({

    title: "",
    weight: "",
    pickup: "",
    destination: "",
    truckType: "",
    status: "Available",
    pickupDate: "",
    deliveryDate: "",
    description: "",
    instructions: "",

  });


  const [errors, setErrors] = useState({});



  const handleChange = ({ target: { name, value } }) => {

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));


    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

  };



  const handleSubmit = (event) => {

    event.preventDefault();


    const nextErrors = requiredFields.reduce(
      (result, field) => {

        if (!formData[field].trim()) {

          result[field] = "This field is required";

        }

        return result;

      },
      {}
    );



    if (Object.keys(nextErrors).length) {

      setErrors(nextErrors);

      return;

    }



    // Create new load
    createLoad({

      ...formData,

      createdBy: user?.email,

      ownerName: user?.fullName,

    });



    // Add activity record
    addActivity({

      type: "load",

      title: "New Cargo Load Created",

      description:
        `${formData.pickup} → ${formData.destination}`,

      userEmail: user?.email,

    });



    navigate("/freight-owner/loads");

  };



  return (

    <DashboardLayout>

      <LoadForm

        formData={formData}

        errors={errors}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        buttonText="Create Load"

      />

    </DashboardLayout>

  );

};



export default CreateLoad;
