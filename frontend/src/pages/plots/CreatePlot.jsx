import { useEffect, useState } from "react";
import { createPlot } from "../../api/plot.api";
import { getProjects } from "../../api/project.api";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

const CreatePlot = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    project_id: "",
    plot_number: "",
    block_code: "",
    dimension_sqft: "",
    plot_category: "",
    plot_facing: "",
    bsp_per_sqft: "",
    plc_charges: ""
  });

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data.projects))
      .catch(() => toast.error("Failed to load projects"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.project_id || !form.plot_number) {
      return toast.error("Project & Plot Number required");
    }

    try {
      setLoading(true);
      await createPlot(form);
      toast.success("Plot created");
      navigate("/plots");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Create Plot</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto">
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">

          <Select
            label="Project"
            name="project_id"
            value={form.project_id}
            onChange={handleChange}
            options={projects.map(p => ({
              value: p.id,
              label: p.project_name
            }))}
          />

          <Input label="Plot Number" name="plot_number" value={form.plot_number} onChange={handleChange} />
          <Input label="Block Code" name="block_code" value={form.block_code} onChange={handleChange} />
          <Input label="Dimension" name="dimension_sqft" value={form.dimension_sqft} onChange={handleChange} />

          <Input label="Category" name="plot_category" value={form.plot_category} onChange={handleChange} />
          <Input label="Facing" name="plot_facing" value={form.plot_facing} onChange={handleChange} />

          <Input label="Price / sqft" name="bsp_per_sqft" value={form.bsp_per_sqft} onChange={handleChange} />
          <Input label="PLC Charges" name="plc_charges" value={form.plc_charges} onChange={handleChange} />

          <div className="md:col-span-2 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate("/plots")}
              className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create Plot"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePlot;


/* INPUT */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input {...props} className="w-full border px-3 py-2 rounded-lg" />
  </div>
);


/* SELECT */
const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <select {...props} className="w-full border px-3 py-2 rounded-lg">
      <option value="">Select</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);