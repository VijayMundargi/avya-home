import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">

     
      <Sidebar />

     
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children}
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;