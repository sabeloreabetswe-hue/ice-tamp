const DashboardSection = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md mt-8">

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold text-[#2A3663]">
          {title}
        </h2>

      </div>

      <div className="p-6">
        {children}
      </div>

    </div>
  );
};

export default DashboardSection;
