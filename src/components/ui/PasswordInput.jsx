import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  icon,
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  const [show, setShow] = useState(false);

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
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            h-14
            rounded-xl
            pl-12
            pr-12
            outline-none
            transition
            ${
              error
                ? "border border-red-500 focus:border-red-500"
                : "border border-gray-300 focus:border-[#B59F78]"
            }
          `}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
