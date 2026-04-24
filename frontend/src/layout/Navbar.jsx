import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../api/auth.api";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const logout = async () => {
    await logoutUser();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1>Dashboard</h1>
      <div className="flex gap-4">
        <span>{user?.name}</span>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;