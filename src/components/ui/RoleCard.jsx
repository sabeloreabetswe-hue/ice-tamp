const RoleCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        p-2
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1

        ${
          selected
            ? "border-[#2A3663] bg-[#D8DBBD] shadow-md"
            : "border-gray-200 bg-white hover:border-[#B59F78]"
        }
      `}
    >
      <div className="flex flex-col items-center text-center">

        <div
          className={`
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            mb-4
            text-2xl

            ${
              selected
                ? "bg-[#2A3663] text-white"
                : "bg-[#FAF6E3] text-[#2A3663]"
            }
          `}
        >
          {icon}
        </div>

        <h3 className="font-bold text-lg text-[#2A3663]">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          {description}
        </p>

      </div>
    </div>
  );
};

export default RoleCard;
