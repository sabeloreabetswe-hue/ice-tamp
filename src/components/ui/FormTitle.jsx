const FormTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">

      <h2 className="text-4xl font-bold text-[#2A3663]">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {subtitle}
      </p>

    </div>
  );
};

export default FormTitle;
