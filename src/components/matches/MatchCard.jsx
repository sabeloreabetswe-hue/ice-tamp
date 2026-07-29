const MatchCard = ({
  truck,
  onRequest,
}) => {


  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        border
      "
    >


      <h2
        className="
          text-xl
          font-bold
          text-[#2A3663]
        "
      >
        {truck.truckName}
      </h2>



      <div className="mt-4 space-y-2">


        <p>
          <strong>
            Registration:
          </strong>{" "}
          {truck.registrationNumber}
        </p>



        <p>
          <strong>
            Truck Type:
          </strong>{" "}
          {truck.truckType}
        </p>



        <p>
          <strong>
            Capacity:
          </strong>{" "}
          {truck.capacity} kg
        </p>



        <p>
          <strong>
            Location:
          </strong>{" "}
          {truck.location}
        </p>


      </div>



      <div
        className="
          mt-5
          bg-[#D8DBBD]
          rounded-xl
          p-4
        "
      >

        <p className="text-gray-700">

          Compatibility Score

        </p>


        <p
          className="
            text-3xl
            font-bold
            text-[#2A3663]
          "
        >

          {truck.compatibility}%

        </p>


      </div>



      <button

        onClick={() =>
          onRequest(truck)
        }


        className="
          mt-6
          w-full
          px-5
          py-3
          rounded-xl
          bg-[#2A3663]
          text-white
          hover:bg-[#1f294d]
          transition
        "

      >

        Request Match

      </button>


    </div>

  );

};


export default MatchCard;
