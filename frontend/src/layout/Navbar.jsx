import { Bell, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.api";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}
      <h1 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* USER */}
        <div
          className="flex items-center gap-3 cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

          <ChevronDown size={16} />

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-md">

              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                My Profile
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;