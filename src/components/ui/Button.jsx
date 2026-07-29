const Button = ({
  children,
  icon,
  type = "button",
  variant = "primary",
  fullWidth = true,
  disabled = false,
  onClick,
}) => {
  const variants = {
    primary: "bg-[#2A3663] text-white hover:bg-[#1F294D] shadow-[0_10px_25px_-12px_rgba(42,54,99,0.65)]",
    secondary: "bg-[#B59F78] text-white hover:opacity-90",
    outline: "border border-[#2A3663] text-[#2A3663] hover:bg-[#F7F4EA]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        h-14
        rounded-2xl
        font-semibold
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-3
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default Button;
