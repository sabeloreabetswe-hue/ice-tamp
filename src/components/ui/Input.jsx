const Input = ({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <div className="space-y-2">

      <label className="font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

          {icon}

        </span>

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            h-12
            rounded-xl
            pl-12
            pr-4
            outline-none
            transition
            ${
              error
                ? "border border-red-500 focus:border-red-500"
                : "border border-gray-300 focus:border-[#B59F78]"
            }
          `}
          aria-invalid={error ? "true" : "false"}
        />

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
