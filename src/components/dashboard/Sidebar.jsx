import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  freightOwnerMenu,
  transporterMenu,
  adminMenu,
} from "../../data/sidebarMenus.jsx";

import {
  FaTruck,
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();

let menuItems = [];

const normalizedRole = user?.role?.toString().trim().toLowerCase();

if (normalizedRole === "freightowner") {
  menuItems = freightOwnerMenu;
} else if (normalizedRole === "transporter") {
  menuItems = transporterMenu;
} else if (normalizedRole === "admin") {
  menuItems = adminMenu;
}

  return (
    <aside className="w-64 bg-[#2A3663] text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#44507a]">
        <div className="flex items-center gap-3">
          <FaTruck className="text-3xl text-[#B59F78]" />

          <div>
            <h2 className="font-bold text-xl">TAMP</h2>

            <p className="text-xs text-gray-300">
              Truck Asset Matchmaking Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-5 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#B59F78] text-[#2A3663] font-semibold"
                  : "text-white hover:bg-[#3b4a82]"
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
