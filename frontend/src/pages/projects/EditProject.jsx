import { useEffect, useState } from "react";
import { getProject, updateProject } from "../../api/project.api";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    project_name: "",
    location: "",
    total_area: "",
    base_price_sqft: "",
    launch_date: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProject(id);
        setForm(res.data.project);
      } catch (err) {
        alert("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProject(id, form);
      alert("Project updated successfully");
      navigate("/projects");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Project
        </h1>
        <p className="text-sm text-gray-500">
          Update project details
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* PROJECT NAME */}
          <div className="md:col-span-2">
            <label className="label">Project Name</label>
            <input
              name="project_name"
              value={form.project_name}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="label">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* TOTAL AREA */}
          <div>
            <label className="label">Total Area</label>
            <input
              name="total_area"
              value={form.total_area}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="label">Price / sqft</label>
            <input
              name="base_price_sqft"
              value={form.base_price_sqft}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="label">Launch Date</label>
            <input
              type="date"
              name="launch_date"
              value={form.launch_date || ""}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="label">Status</label>
            <select
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Update Project"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProject;