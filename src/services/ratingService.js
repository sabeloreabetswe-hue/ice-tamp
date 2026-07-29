const STORAGE_KEY = "tamp_ratings";


// Get ratings

export const getRatings = () => {

  const ratings =
    localStorage.getItem(
      STORAGE_KEY
    );


  return ratings
    ? JSON.parse(ratings)
    : [];

};




// Save ratings

const saveRatings = (
  ratings
) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ratings)
  );

};





// Create rating

export const createRating = (
  rating
) => {


  const ratings =
    getRatings();



  const newRating = {


    id:
    crypto.randomUUID(),


    ...rating,


    createdAt:
    new Date().toISOString()


  };



  ratings.push(
    newRating
  );



  saveRatings(
    ratings
  );



  return newRating;

};




// Get ratings by shipment

export const getShipmentRatings = (
  shipmentId
) => {


  const ratings =
    getRatings();



  return ratings.filter(

    (rating)=>
      rating.shipmentId === shipmentId

  );


};

export const hasRatedShipment = (
shipmentId
)=>{


const ratings =
getRatings();


return ratings.some(

(rating)=>
rating.shipmentId === shipmentId

);


};

// Get all ratings given by a specific transporter
export const getRatingsByTransporter = (
 transporterEmail
) => {

 const ratings =
 getRatings();

 return ratings.filter(

 (rating)=>
 rating.transporterEmail === transporterEmail

 );

};


// Check if a specific rater has already rated a shipment
export const hasRatedShipmentByRater = (
 shipmentId,
 raterEmail
) => {

 const ratings =
 getRatings();

 return ratings.some(

 (rating)=>
 rating.shipmentId === shipmentId &&
 rating.raterEmail === raterEmail

 );

};


// Get all ratings given by a specific freight owner
export const getRatingsByFreightOwner = (
 freightOwnerEmail
) => {

 const ratings =
 getRatings();

 return ratings.filter(

 (rating)=>
 rating.raterEmail === freightOwnerEmail &&
 rating.raterRole === "freightOwner"

 );

};
