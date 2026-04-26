import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/project.api";
import { useNavigate } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-600";
    case "completed":
      return "bg-blue-100 text-blue-600";
    case "archived":
      return "bg-gray-200 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ProjectList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getProjects();
    setData(res.data.projects);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    fetchData();
  };

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
          <p className="text-sm text-gray-500">Manage all your projects</p>
        </div>

        <button
          onClick={() => navigate("/projects/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Project
        </button>
      </div>

      {/* CARD WRAPPER */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Location</th>
                <th className="p-4">Area</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">

                  <td className="p-4 font-medium text-gray-800">
                    {p.project_name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {p.location}
                  </td>

                  <td className="p-4 text-gray-600">
                    {p.total_area || "-"}
                  </td>

                  <td className="p-4 text-gray-600">
                    ₹ {p.base_price_sqft || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 flex justify-end gap-3">
                    <button
                      onClick={() => navigate(`/projects/edit/${p.id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-4 p-4">
          {data.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">
                  {p.project_name}
                </h2>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                    p.status
                  )}`}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                📍 {p.location}
              </p>

              <p className="text-sm text-gray-500">
                📐 Area: {p.total_area || "-"}
              </p>

              <p className="text-sm text-gray-500">
                💰 ₹ {p.base_price_sqft || "-"}
              </p>

              <div className="flex justify-end gap-4 mt-3">
                <button
                  onClick={() => navigate(`/projects/edit/${p.id}`)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectList;