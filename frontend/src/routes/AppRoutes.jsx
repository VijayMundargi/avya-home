import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// DASHBOARD
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";

// ASSOCIATES
import AssociateList from "../pages/associates/AssociateList";
import CreateAssociate from "../pages/associates/CreateAssociate";
import EditAssociate from "../pages/associates/EditAssociate";
import WelcomeLetterPage from "../pages/associates/WelcomeLetterPage";

// PROJECTS
import ProjectList from "../pages/projects/ProjectList";
import CreateProject from "../pages/projects/CreateProject";
import EditProject from "../pages/projects/EditProject";

// PLOTS
import PlotList from "../pages/plots/PlotList";
import CreatePlot from "../pages/plots/CreatePlot";
import EditPlot from "../pages/plots/EditPlot";
import PlotGrid from "../pages/plots/PlotGrid";

// LAYOUT & AUTH
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";

// ✅ ADD THESE
import CustomerList from "../pages/customers/CustomerList";
import CreateCustomer from "../pages/customers/CreateCustomer";
import CustomerDetails from "../pages/customers/CustomerDetails";
import Booking from "../pages/customers/Booking";

import CreatePayment from "../pages/payments/CreatePayment";
import PaymentList from "../pages/payments/PaymentList";

import Statement from "../pages/reports/Statement";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= DASHBOARD ================= */}
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

        {/* ================= PROFILE ================= */}
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

        {/* ================= ASSOCIATES ================= */}
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

        {/* ================= PROJECTS ================= */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute roles={["super_admin", "manager"]}>
              <DashboardLayout>
                <ProjectList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <CreateProject />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <EditProject />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= PLOTS ================= */}

        <Route
          path="/plots"
          element={
            <ProtectedRoute roles={["super_admin", "manager"]}>
              <DashboardLayout>
                <PlotList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/plots/create"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <CreatePlot />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/plots/edit/:id"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <DashboardLayout>
                <EditPlot />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔥 PLOT MAP GRID (FIXED) */}
        <Route
          path="/plots/map"
          element={
            <ProtectedRoute roles={["super_admin", "manager"]}>
              <DashboardLayout>
                <PlotGrid />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

          {/* ================= CUSTOMERS ================= */}

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CustomerList />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/create"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CreateCustomer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/customers/:id"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CustomerDetails />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/booking"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Booking />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

{/* ================= PAYMENTS ================= */}

<Route
  path="/payments"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <PaymentList />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/payments/create"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CreatePayment />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

{/* ================= REPORTS ================= */}

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Statement />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;