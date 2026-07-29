import { useEffect, useState } from "react";

import {
  getActivities,
} from "../../services/activityService";


const RecentActivity = () => {

  const [activities, setActivities] = useState([]);


  useEffect(() => {

    loadActivities();

  }, []);



  const loadActivities = () => {

    const activityData = getActivities();


    const latestActivities =
      activityData
        .slice()
        .reverse()
        .slice(0, 5);


    setActivities(latestActivities);

  };



  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">


      <h2 className="text-xl font-bold text-[#2A3663] mb-5">

        Recent Activity

      </h2>



      {
        activities.length === 0 ? (

          <p className="text-gray-500">

            No recent activity available.

          </p>


        ) : (


          <div className="space-y-4">


            {
              activities.map((activity) => (

                <div

                  key={activity.id}

                  className="
                    border-b
                    pb-4
                    last:border-none
                  "

                >


                  <h3 className="font-semibold text-[#2A3663]">

                    {activity.title}

                  </h3>



                  <p className="text-gray-600 mt-1">

                    {activity.description}

                  </p>



                  <p className="text-sm text-gray-400 mt-2">

                    {
                      activity.createdAt
                      ?
                      new Date(
                        activity.createdAt
                      ).toLocaleString()
                      :
                      "Recently"
                    }

                  </p>


                </div>

              ))

            }


          </div>


        )

      }


    </div>

  );

};


export default RecentActivity;
