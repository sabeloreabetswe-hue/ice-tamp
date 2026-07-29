const STORAGE_KEY = "tamp_confirmations";


// Get all confirmations

export const getConfirmations = () => {

  const confirmations =
    localStorage.getItem(
      STORAGE_KEY
    );


  return confirmations
    ? JSON.parse(confirmations)
    : [];

};




// Save confirmations

const saveConfirmations = (
  confirmations
) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(confirmations)
  );

};




// Create confirmation receipt

export const createConfirmation = (
  confirmation
) => {


  const confirmations =
    getConfirmations();



  const newConfirmation = {


    id:
    crypto.randomUUID(),


    contractId:
    "TAMP-CON-" +
    Date.now(),



    ...confirmation,



    createdAt:
    new Date().toISOString()


  };



  confirmations.push(
    newConfirmation
  );



  saveConfirmations(
    confirmations
  );



  return newConfirmation;


};




// Get receipt by ID

export const getConfirmationById = (
  id
) => {


  const confirmations =
    getConfirmations();



  return confirmations.find(

    (confirmation)=>
      confirmation.id === id

  );


};
