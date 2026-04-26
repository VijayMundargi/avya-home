import { useEffect, useState } from "react";
import { getPlot, updatePlot } from "../../api/plot.api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

const EditPlot = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    plot_number: "",
    block_code: "",
    dimension_sqft: "",
    bsp_per_sqft: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const res = await getPlot(id);
        setForm(res.data.plot);
      } catch (err) {
        toast.error("Failed to load plot");
      } finally {
        setLoading(false);
      }
    };

    fetchPlot();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updatePlot(id, form);
      toast.success("Plot updated successfully");
      navigate("/plots");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading plot...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Plot
        </h1>
        <p className="text-sm text-gray-500">
          Update plot details
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-5xl mx-auto">

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label="Plot Number"
            name="plot_number"
            value={form.plot_number}
            onChange={handleChange}
          />

          <Input
            label="Block Code"
            name="block_code"
            value={form.block_code}
            onChange={handleChange}
          />

          <Input
            label="Dimension (sqft)"
            name="dimension_sqft"
            value={form.dimension_sqft}
            onChange={handleChange}
          />

          <Input
            label="Price / sqft"
            name="bsp_per_sqft"
            value={form.bsp_per_sqft}
            onChange={handleChange}
          />

          {/* ACTION BUTTONS */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={() => navigate("/plots")}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg text-white transition ${
                saving
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Updating..." : "Update Plot"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditPlot;

/* 🔹 INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);