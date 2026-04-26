import { useEffect, useState } from "react";
import { getPlots, deletePlot, updatePlotStatus } from "../../api/plot.api";
import { getProjects } from "../../api/project.api";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

const PlotList = () => {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    project_id: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then(res => setProjects(res.data.projects));
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getPlots(filters);
    setData(res.data.plots);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const remove = async (id) => {
    if (!confirm("Delete plot?")) return;
    await deletePlot(id);
    toast.success("Deleted");
    fetchData();
  };

  const changeStatus = async (id, status) => {
    await updatePlotStatus(id, status);
    toast.success("Updated");
    fetchData();
  };

  const statusStyle = (s) => {
    return {
      available: "bg-green-100 text-green-600",
      hold: "bg-yellow-100 text-yellow-600",
      booked: "bg-blue-100 text-blue-600",
      sold_out: "bg-red-100 text-red-600"
    }[s] || "bg-gray-100";
  };

  return (
    <div className="p-4 md:p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Plots</h1>
        <button onClick={() => navigate("/plots/create")} className="btn-primary">
          + Add Plot
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-3 mb-4">

        <input
          placeholder="Search..."
          className="input"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="input"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="hold">Hold</option>
          <option value="booked">Booked</option>
          <option value="sold_out">Sold</option>
        </select>

        <select
          className="input"
          onChange={(e) => setFilters({ ...filters, project_id: e.target.value })}
        >
          <option value="">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.project_name}</option>
          ))}
        </select>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className="md:hidden space-y-4">
            {data.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow">
                <h2 className="font-semibold">{p.plot_number}</h2>
                <p className="text-sm">{p.project?.project_name}</p>
                <span className={`px-2 py-1 text-xs rounded ${statusStyle(p.status)}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3">Plot</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map(p => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{p.plot_number}</td>
                    <td className="p-3">{p.project?.project_name}</td>
                    <td className="p-3">₹ {p.total_price}</td>

                    <td className="p-3">
                      <select
                        value={p.status}
                        onChange={(e) => changeStatus(p.id, e.target.value)}
                        className="input"
                      >
                        <option value="available">Available</option>
                        <option value="hold">Hold</option>
                        <option value="booked">Booked</option>
                        <option value="sold_out">Sold</option>
                      </select>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button onClick={() => navigate(`/plots/edit/${p.id}`)} className="text-blue-600">Edit</button>
                      <button onClick={() => remove(p.id)} className="text-red-600">Delete</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PlotList;