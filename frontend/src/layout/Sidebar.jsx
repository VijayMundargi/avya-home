import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded transition ${
      isActive ? "bg-gray-700" : "hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Avya CRM</h2>

      <nav className="flex flex-col gap-2">

        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {(user?.role === "super_admin" || user?.role === "manager") && (
          <NavLink to="/associates" className={linkClass}>
            Associates
          </NavLink>
        )}

        {user?.role === "super_admin" && (
          <NavLink to="/associates/create" className={linkClass}>
            Create Associate
          </NavLink>
        )}

        {/* ✅ PROFILE ADDED */}
        <NavLink to="/profile" className={linkClass}>
          My Profile
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;