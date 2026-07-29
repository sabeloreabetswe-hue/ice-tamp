import {
  FaTruckMoving,
  FaUserTie,
  FaShieldAlt,
} from "react-icons/fa";

import RoleCard from "./RoleCard";

const roles = [
  {
    id: "freightOwner",
    title: "Freight Owner",
    description: "Post loads and manage deliveries.",
    icon: <FaUserTie />,
  },
  {
    id: "transporter",
    title: "Transporter",
    description: "Register trucks and accept freight jobs.",
    icon: <FaTruckMoving />,
  },
  {
    id: "admin",
    title: "Admin",
    description: "Manage users and monitor the platform.",
    icon: <FaShieldAlt />,
  },
];

const RoleSelector = ({ selectedRole, onSelect }) => {
  return (
    <div>

      <label className="block font-semibold text-gray-700 mb-2">
        Select Your Role
      </label>

      <div className="grid md:grid-cols-3 gap-5">

        {roles.map((role) => (
          <RoleCard
            key={role.id}
            title={role.title}
            description={role.description}
            icon={role.icon}
            selected={selectedRole === role.id}
            onClick={() => onSelect(role.id)}
          />
        ))}

      </div>

    </div>
  );
};

export default RoleSelector;
