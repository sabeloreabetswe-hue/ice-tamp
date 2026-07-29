import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {
  getShipments,
  updateShipmentStatus,
  confirmDelivery,
} from "../../services/shipmentService";

import TrackingTimeline from "../../components/tracking/TrackingTimeline";
import RatingForm 
from "../../components/ratings/RatingForm";


const ViewShipments = () => {

  const { user } = useAuth();


  const [shipments, setShipments] = useState([]);



  useEffect(() => {

    loadShipments();

  }, []);



  const loadShipments = () => {

    const allShipments =
      getShipments();


    const ownerShipments =
      allShipments.filter(
        (shipment) =>
          shipment.freightOwnerEmail === user.email
      );


    setShipments(ownerShipments);

  };





  // Update shipment status

  const handleStatusChange = (
    shipment,
    status
  ) => {


    updateShipmentStatus(
      shipment.id,
      status
    );


    loadShipments();


    alert(
      `Shipment status updated to "${status}".`
    );

  };






  // Confirm delivery

  const handleConfirmDelivery = (
    shipment
  ) => {


    const confirmed =
      window.confirm(
        "Are you sure you want to confirm this delivery?"
      );


    if (!confirmed) {

      return;

    }



    confirmDelivery(
      shipment.id
    );


    loadShipments();



    alert(
      "Delivery confirmed successfully."
    );


  };






  const getStatusColour = (
    status
  ) => {


    switch(status){


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


      <h1 className="
        text-3xl
        font-bold
        text-[#2A3663]
        mb-8
      ">

        My Shipments

      </h1>





      {
      shipments.length === 0 ? (


        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-10
          text-center
        ">


          <h2 className="
            text-2xl
            font-semibold
            text-[#2A3663]
          ">

            No shipments available.

          </h2>



          <p className="
            text-gray-500
            mt-3
          ">

            Accepted freight requests will appear here.

          </p>


        </div>



      ) : (



        <div className="space-y-6">


        {
        shipments.map(
          (shipment) => (



          <div

            key={shipment.id}

            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
            "

          >




            {/* Shipment Header */}

            <div className="
              flex
              justify-between
              items-center
            ">


              <h2 className="
                text-xl
                font-bold
                text-[#2A3663]
              ">

                {shipment.loadTitle}

              </h2>




              <span

              className={`
                px-4
                py-1
                rounded-full
                font-semibold
                ${getStatusColour(
                  shipment.shipmentStatus
                )}
              `}

              >

                {shipment.shipmentStatus}

              </span>



            </div>


            {/* Shipment Information */}


            <div className="
              grid
              md:grid-cols-2
              gap-4
              mt-6
            ">


              <p>

                <strong>
                  Pickup:
                </strong>{" "}

                {shipment.pickup}

              </p>




              <p>

                <strong>
                  Destination:
                </strong>{" "}

                {shipment.destination}

              </p>


              <p>

                <strong>
                  Transporter:
                </strong>{" "}

                {shipment.transporterName}

              </p>


              <p>

                <strong>
                  Created:
                </strong>{" "}


                {
                shipment.createdAt

                ?

                new Date(
                  shipment.createdAt
                ).toLocaleDateString()

                :

                "N/A"

                }


              </p>





              {
              shipment.deliveryConfirmed && (


                <p>


                  <strong>
                    Delivered:
                  </strong>{" "}


                  {
                  new Date(
                    shipment.deliveredAt
                  )
                  .toLocaleDateString()

                  }


                </p>


              )

              }


            </div>







            {/* Tracking Timeline */}

            <TrackingTimeline

              history={
                shipment.trackingHistory || []
              }

            />



            {
        shipment.shipmentStatus === "Delivered" && (

        <RatingForm

        shipment={shipment}

        />

        )
        }




            {/* Status Buttons */}


            {
            !shipment.deliveryConfirmed && (



              <div className="
                flex
                flex-wrap
                gap-3
                mt-6
              ">





                <button

                  onClick={() =>
                    handleStatusChange(
                      shipment,
                      "Driver Assigned"
                    )
                  }


                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-purple-600
                    text-white
                    hover:bg-purple-700
                  "

                >

                  Driver Assigned

                </button>







                <button

                  onClick={() =>
                    handleStatusChange(
                      shipment,
                      "In Transit"
                    )
                  }


                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  "

                >

                  In Transit

                </button>







                {
                shipment.shipmentStatus ===
                "In Transit" && (



                <button

                  onClick={() =>
                    handleConfirmDelivery(
                      shipment
                    )
                  }


                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-green-600
                    text-white
                    hover:bg-green-700
                  "

                >

                  Confirm Delivery

                </button>



                )

                }



              </div>



            )

            }



          </div>



          )

        )

        }


        </div>

      )

      }

    </DashboardLayout>

  );

};


export default ViewShipments;
