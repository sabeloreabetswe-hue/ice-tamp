import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import { getLoads } from "../../services/loadService";

import {
  getRecommendedTrucks,
} from "../../services/recommendationService";

import MatchCard from "../../components/matches/MatchCard";

import { createMatch } from "../../services/matchService";


const RecommendedMatches = () => {


  const { user } = useAuth();


  const [loads, setLoads] = useState([]);

  const [selectedLoad, setSelectedLoad] = useState(null);

  const [recommendations, setRecommendations] = useState([]);



  useEffect(() => {

    loadOwnerLoads();

  }, [user]);



  const loadOwnerLoads = () => {

    const allLoads = getLoads();


    const ownerLoads =
      allLoads.filter(
        (load) =>
          load.createdBy === user.email
      );


    setLoads(ownerLoads);

  };



  const handleSelectLoad = (load) => {

    setSelectedLoad(load);


    const trucks =
      getRecommendedTrucks(load);


    setRecommendations(trucks);

  };



  const handleRequestMatch = (truck) => {


    createMatch({

      loadId:
        selectedLoad.id,


      transporterEmail:
        truck.createdBy,


      transporterName:
        truck.ownerName,


      freightOwnerEmail:
        user.email,


      freightOwnerName:
        user.fullName,


      loadTitle:
        selectedLoad.title,


      pickup:
        selectedLoad.pickup,


      destination:
        selectedLoad.destination,


      truckId:
        truck.id,


      compatibility:
        truck.compatibility,

    });



    alert(
      "Match request sent successfully."
    );

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

        Recommended Matches

      </h1>



      <div className="grid md:grid-cols-3 gap-6">


        {
          loads.map((load)=>(

            <button

              key={load.id}

              onClick={() =>
                handleSelectLoad(load)
              }


              className="
                bg-white
                rounded-xl
                shadow-md
                p-5
                text-left
                hover:border-[#B59F78]
                border
              "

            >


              <h2
                className="
                font-bold
                text-[#2A3663]
                "
              >

                {load.title}

              </h2>


              <p>
                {load.pickup}
                {" → "}
                {load.destination}
              </p>


              <p>
                Weight:
                {" "}
                {load.weight} kg
              </p>


            </button>


          ))

        }


      </div>




      {
        selectedLoad && (

          <div className="mt-10">


            <h2
              className="
              text-2xl
              font-bold
              text-[#2A3663]
              mb-6
              "
            >

              Available Trucks For:

              {" "}

              {selectedLoad.title}

            </h2>



            {
              recommendations.length === 0 ? (

                <p className="text-gray-500">

                  No compatible trucks found.

                </p>


              ) : (


                <div
                  className="
                  grid
                  md:grid-cols-3
                  gap-6
                  "
                >

                  {
                    recommendations.map(
                      (truck)=>(


                        <MatchCard

                          key={truck.id}

                          truck={truck}

                          onRequest={
                            handleRequestMatch
                          }

                        />


                      )

                    )

                  }


                </div>


              )

            }


          </div>

        )

      }



    </DashboardLayout>

  );

};


export default RecommendedMatches;
