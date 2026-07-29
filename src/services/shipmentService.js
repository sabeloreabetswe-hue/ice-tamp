import { addActivity } from "./activityService";

const STORAGE_KEY = "tamp_shipments";


// Get all shipments
export const getShipments = () => {

  const shipments = localStorage.getItem(STORAGE_KEY);

  return shipments ? JSON.parse(shipments) : [];

};


// Save shipments
const saveShipments = (shipments) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(shipments)
  );

};


// Create shipment
export const createShipment = (shipment) => {

  const shipments = getShipments();


  const newShipment = {

    id: crypto.randomUUID(),

    ...shipment,

    shipmentStatus: "Pending Pickup",

    createdAt: new Date().toISOString(),

  };


  shipments.push(newShipment);


  saveShipments(shipments);



  addActivity({

    type: "shipment",

    title: "Shipment Created",

    description:
      `${shipment.pickup} → ${shipment.destination}`,

    userEmail:
      shipment.freightOwnerEmail,

  });



  return newShipment;

};



// Get shipment by ID
export const getShipmentById = (id) => {

  const shipments = getShipments();


  return shipments.find(
    (shipment) => shipment.id === id
  );

};



// Check if shipment already exists
export const shipmentExists = (
  loadId,
  transporterEmail
) => {

  const shipments = getShipments();


  return shipments.some(
    (shipment) =>
      shipment.loadId === loadId &&
      shipment.transporterEmail === transporterEmail
  );

};



// Update shipment status
export const updateShipmentStatus = (
  id,
  status
) => {

  const shipments = getShipments();
  const shipmentToUpdate = shipments.find((shipment) => shipment.id === id);


  const updatedShipments =
    shipments.map(
      (shipment) => {


        if(shipment.id === id){


          return {

            ...shipment,


            shipmentStatus: status,


            trackingHistory:[

              ...(shipment.trackingHistory || []),


              {

                status: status,

                time:
                new Date()
                .toISOString()

              }

            ]

          };


        }


        return shipment;


      }
    );



  saveShipments(
    updatedShipments
  );

  if (shipmentToUpdate) {
    addActivity({
      type: "shipment",
      title: "Shipment Updated",
      description: `${shipmentToUpdate.loadTitle || "Shipment"} status changed to ${status}`,
      userEmail: shipmentToUpdate.freightOwnerEmail,
    });
  }

};




// Confirm delivery
export const confirmDelivery = (id) => {

  const shipments = getShipments();


  const updatedShipments = shipments.map(
    (shipment) => {


      if (shipment.id === id) {


        addActivity({

          type: "delivery",

          title:
            "Delivery Completed",

          description:
            `${shipment.pickup} → ${shipment.destination}`,

          userEmail:
            shipment.freightOwnerEmail,

        });



        return {

          ...shipment,

          shipmentStatus: "Delivered",

          deliveryConfirmed: true,

          deliveredAt:
            new Date().toISOString(),

        };

      }



      return shipment;

    }
  );



  saveShipments(updatedShipments);

};
