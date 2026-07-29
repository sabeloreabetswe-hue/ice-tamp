import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-[#e9e2d0] bg-white/90 px-6 py-4 backdrop-blur sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
         
            Welcome back, {user?.fullName || "there"}
          
        </div>

        <div className="flex items-center gap-3">
          

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-[#2A3663] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d274a]"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
