const STORAGE_KEY = "tamp_matches";


// Get all requests
export const getMatches = () => {

  const matches = localStorage.getItem(
    STORAGE_KEY
  );

  return matches
    ? JSON.parse(matches)
    : [];

};



// Save requests
const saveMatches = (matches) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(matches)
  );

};



// Create a new request
export const createMatch = (match) => {

  const matches = getMatches();


  const newMatch = {

    id: crypto.randomUUID(),

    ...match,

    status: "Pending",

    createdAt:
      new Date().toISOString(),

  };


  matches.push(newMatch);


  saveMatches(matches);


  return newMatch;

};



// Get a single request by ID
export const getMatchById = (id) => {

  const matches = getMatches();


  return matches.find(
    (match) =>
      match.id === id
  );

};



// Update a request
export const updateMatch = (
  updatedMatch
) => {

  const matches = getMatches();


  const updatedMatches =
    matches.map((match) =>

      match.id === updatedMatch.id

      ? {
          ...match,
          ...updatedMatch,
        }

      : match

    );


  saveMatches(updatedMatches);


  return updatedMatch;

};



// Check if transporter already requested load
export const hasRequestedLoad = (
  transporterEmail,
  loadId
) => {

  const matches = getMatches();


  return matches.some(
    (match) =>
      match.transporterEmail === transporterEmail &&
      match.loadId === loadId
  );

};



// ======================================
// PHASE 8.1
// MATCH COMPATIBILITY CALCULATION
// ======================================

export const calculateMatchScore = (
  load,
  truck
) => {


  let score = 0;



  // 1. Truck type compatibility
  if (
    load.truckType === truck.truckType
  ) {

    score += 40;

  }



  // 2. Capacity compatibility
  if (
    Number(truck.capacity)
    >=
    Number(load.weight)
  ) {

    score += 40;

  }



  // 3. Location compatibility
  if (
    load.pickup === truck.location
  ) {

    score += 20;

  }



  return score;

};
export const updateMatchStatus = (
  id,
  status
) => {


  const matches =
    getMatches();



  const updatedMatches =
    matches.map(
      (match)=>


      match.id === id

      ?

      {
        ...match,
        status,
      }


      :

      match

    );



  saveMatches(
    updatedMatches
  );


};
