const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-[#2A3663]",
  subtitle = "",
}) => {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#e9e2d0] bg-white p-6 shadow-[0_16px_36px_-24px_rgba(42,54,99,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_-22px_rgba(42,54,99,0.55)]">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f7f4ea] opacity-70" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2A3663]">{value}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </div>

        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
