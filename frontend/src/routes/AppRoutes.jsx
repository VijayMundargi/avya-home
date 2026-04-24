import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import AssociateList from "../pages/associates/AssociateList";
import CreateAssociate from "../pages/associates/CreateAssociate";
import EditAssociate from "../pages/associates/EditAssociate";
import Profile from "../pages/profile/Profile";
import WelcomeLetterPage from "../pages/associates/WelcomeLetterPage"; // ✅ ADD THIS

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/associates"
          element={
            <ProtectedRoute roles={["super_admin", "manager"]}>
              <DashboardLayout>
                <AssociateList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/associates/create"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <CreateAssociate />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/associates/edit/:id"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <EditAssociate />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THIS ROUTE */}
        <Route
          path="/welcome-letter"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <WelcomeLetterPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;