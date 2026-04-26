import { useState } from "react";
import { createProject } from "../../api/project.api";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast"; // ✅ correct path

const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    project_name: "",
    location: "",
    total_area: "",
    base_price_sqft: "",
    launch_date: ""
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT FORM
  const submit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!form.project_name || !form.location) {
      toast.error("Project name and location are required");
      return;
    }

    setLoading(true);

    try {
      await createProject(form);

      toast.success("Project created successfully");

      navigate("/projects");

    } catch (err) {
      console.log("ERROR:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Project
        </h1>
        <p className="text-sm text-gray-500">
          Add a new project to your system
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* PROJECT NAME */}
          <div className="md:col-span-2">
            <label className="label">Project Name *</label>
            <input
              name="project_name"
              value={form.project_name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="input"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="label">Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="input"
            />
          </div>

          {/* TOTAL AREA */}
          <div>
            <label className="label">Total Area (sqft)</label>
            <input
              name="total_area"
              value={form.total_area}
              onChange={handleChange}
              placeholder="e.g. 1500"
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
              placeholder="e.g. 2500"
              className="input"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="label">Launch Date</label>
            <input
              type="date"
              name="launch_date"
              value={form.launch_date}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* ACTION BUTTONS */}
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
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProject;