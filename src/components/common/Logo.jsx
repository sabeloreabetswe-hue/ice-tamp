import { FaTruckMoving } from "react-icons/fa";

const Logo = ({ size = "large" }) => {
  const sizes = {
    small: {
      container: "w-12 h-12",
      icon: "text-xl",
      title: "text-lg",
      subtitle: "text-xs",
    },
    medium: {
      container: "w-14 h-14",
      icon: "text-2xl",
      title: "text-xl",
      subtitle: "text-sm",
    },
    large: {
      container: "w-16 h-16",
      icon: "text-3xl",
      title: "text-2xl",
      subtitle: "text-sm",
    },
  };

  const current = sizes[size] || sizes.large;

  return (
    <div className="flex flex-col items-center">

      <div
        className={`${current.container} bg-[#2A3663] rounded-2xl flex items-center justify-center shadow-lg`}
      >
        <FaTruckMoving className={`${current.icon} text-white`} />
      </div>

      <div className="text-center">

        <h1 className={`${current.title} font-bold text-white mt-5`}>
    TAMP
</h1>

        <p className={`${current.subtitle} text-[#D8DBBD] text-center mt-2`}>
    Truck Asset Matchmaking Platform
</p>

      </div>

    </div>
  );
};

export default Logo;
