import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>

      {/* ✅ TOAST CONTAINER */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            padding: "12px",
            fontSize: "14px"
          }
        }}
      />

      {/* ROUTES */}
      <AppRoutes />

    </AuthProvider>
  );
}

export default App;