import {
  LayoutDashboard,
  User,
  Users,
  Plus,
  GitBranch,
  TrendingUp,
  Building2,
  Map,
  UserCircle,
  CreditCard,
  Wallet,
  Receipt,
  FileText,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  const sectionTitle =
    "px-3 pt-4 pb-1 text-xs text-gray-400 uppercase tracking-wide";

  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white flex flex-col">

      {/* LOGO */}
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-lg font-semibold tracking-wide">Avya CRM</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">

        {/* DASHBOARD */}
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User size={18} />
          My Profile
        </NavLink>

        {/* ================= ASSOCIATES ================= */}
        {(user?.role === "super_admin" || user?.role === "manager") && (
          <>
            <p className={sectionTitle}>Associates</p>

            <NavLink to="/associates" className={linkClass}>
              <Users size={18} />
              All Associates
            </NavLink>

            {user?.role === "super_admin" && (
              <>
                <NavLink to="/associates/create" className={linkClass}>
                  <Plus size={18} />
                  Create Associate
                </NavLink>

                <NavLink to="/welcome-letter" className={linkClass}>
                  <FileText size={18} />
                  Welcome Letter
                </NavLink>
              </>
            )}

            <NavLink to="/referrals" className={linkClass}>
              <GitBranch size={18} />
              Referral Tree
            </NavLink>

            <NavLink to="/downline" className={linkClass}>
              <TrendingUp size={18} />
              Downline Team
            </NavLink>
          </>
        )}

        {/* ================= PROJECTS ================= */}
        {(user?.role === "super_admin" || user?.role === "manager") && (
          <>
            <p className={sectionTitle}>Projects</p>

            <NavLink to="/projects" className={linkClass}>
              <Building2 size={18} />
              All Projects
            </NavLink>

            {user?.role === "super_admin" && (
              <NavLink to="/projects/create" className={linkClass}>
                <Plus size={18} />
                Create Project
              </NavLink>
            )}

            {/* 🔥 PLOTS SUB-MODULE */}
            <NavLink to="/plots" className={linkClass}>
              <Map size={18} />
              All Plots
            </NavLink>

            {user?.role === "super_admin" && (
              <NavLink to="/plots/create" className={linkClass}>
                <Plus size={18} />
                Create Plot
              </NavLink>
            )}
          </>
        )}

        {/* ================= CUSTOMERS ================= */}
        <>
          <p className={sectionTitle}>Customers</p>

          <NavLink to="/customers" className={linkClass}>
            <UserCircle size={18} />
            Customers
          </NavLink>

          <NavLink to="/payments" className={linkClass}>
            <CreditCard size={18} />
            Payments
          </NavLink>
        </>

        {/* ================= FINANCE ================= */}
        <>
          <p className={sectionTitle}>Finance</p>

          <NavLink to="/payouts" className={linkClass}>
            <Wallet size={18} />
            Payouts
          </NavLink>

          <NavLink to="/transactions" className={linkClass}>
            <Receipt size={18} />
            Transactions
          </NavLink>

          <NavLink to="/tds" className={linkClass}>
            <FileText size={18} />
            TDS Reports
          </NavLink>
        </>

        {/* ================= REPORTS ================= */}
        <>
          <p className={sectionTitle}>Reports</p>

          <NavLink to="/reports" className={linkClass}>
            <TrendingUp size={18} />
            Business Report
          </NavLink>
        </>

        {/* ================= SETTINGS ================= */}
        {user?.role === "super_admin" && (
          <>
            <p className={sectionTitle}>Settings</p>

            <NavLink to="/settings" className={linkClass}>
              <Settings size={18} />
              System Settings
            </NavLink>
          </>
        )}

      </div>
    </div>
  );
};

export default Sidebar;