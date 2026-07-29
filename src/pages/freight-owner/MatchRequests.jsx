import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {
  getMatches,
  updateMatchStatus,
} from "../../services/matchService";

import {
  createConfirmation,
} from "../../services/confirmationService";

import {
  createShipment,
} from "../../services/shipmentService";

import MatchRequestCard from "../../components/matches/MatchRequestCard";
import { addActivity } from "../../services/activityService";

const MatchRequestsPage = () => {


  const { user } = useAuth();


  const [matches, setMatches] = useState([]);



  useEffect(() => {

    loadRequests();

  }, []);



  const loadRequests = () => {


    const allMatches =
      getMatches();



    const ownerMatches =
      allMatches.filter(
        (match)=>
          match.freightOwnerEmail === user.email
      );



    setMatches(ownerMatches);

  };





  const handleAccept = (
    match
  ) => {


    updateMatchStatus(
      match.id,
      "Accepted"
    );



    addActivity({
      type: "match",
      title: "Match Accepted",
      description: `${match.loadTitle} was accepted with ${match.transporterName}`,
      userEmail: match.freightOwnerEmail,
    });

    createConfirmation({

      matchId:
        match.id,


      freightOwnerEmail:
        match.freightOwnerEmail,


      freightOwnerName:
        match.freightOwnerName,


      transporterEmail:
        match.transporterEmail,


      transporterName:
        match.transporterName,


      loadTitle:
        match.loadTitle,


      pickup:
        match.pickup,


      destination:
        match.destination,

    });



    createShipment({

      loadId:
        match.loadId,


      loadTitle:
        match.loadTitle,


      pickup:
        match.pickup,


      destination:
        match.destination,


      freightOwnerEmail:
        match.freightOwnerEmail,


      freightOwnerName:
        match.freightOwnerName,


      transporterEmail:
        match.transporterEmail,


      transporterName:
        match.transporterName,

    });



    alert(
      "Match accepted. Shipment created."
    );


    loadRequests();

  };






  const handleReject = (
    match
  ) => {


    updateMatchStatus(
      match.id,
      "Rejected"
    );

    addActivity({
      type: "match",
      title: "Match Rejected",
      description: `${match.loadTitle} was rejected for ${match.transporterName}`,
      userEmail: match.freightOwnerEmail,
    });

    alert(
      "Match rejected."
    );


    loadRequests();

  };





  return (

    <DashboardLayout>


      <h1
        className="
        text-3xl
        font-bold
        text-[#2A3663]
        mb-8
        "
      >

        Match Requests

      </h1>



      {
        matches.length === 0 ?


        (

          <div
          className="
          bg-white
          rounded-2xl
          shadow-lg
          p-10
          text-center
          "
          >

            <h2
            className="
            text-xl
            font-semibold
            text-[#2A3663]
            "
            >

              No match requests available.

            </h2>


          </div>

        )


        :


        (

          <div
          className="
          space-y-6
          "
          >


          {
            matches.map(
              (match)=>(


                <MatchRequestCard

                key={match.id}

                match={match}

                onAccept={
                  handleAccept
                }

                onReject={
                  handleReject
                }

                />


              )
            )

          }


          </div>


        )

      }



    </DashboardLayout>

  );

};


export default MatchRequestsPage;
