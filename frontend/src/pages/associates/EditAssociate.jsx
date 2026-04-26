import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssociate, updateAssociate } from "../../api/associate.api";
import toast from "../../utils/toast"; // ✅ ADD

const EditAssociate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAssociate(id);
        setForm(res.data.user);
      } catch (err) {
        toast.error("Failed to load user"); // ✅ toast
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile) {
      toast.error("Name and mobile are required");
      return;
    }

    setSaving(true);

    try {
      await updateAssociate(id, form);

      toast.success("Associate updated successfully"); // ✅ replace alert

      navigate("/associates");

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Update failed";

      toast.error(message); // ✅ replace setError
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Associate
          </h1>
          <p className="text-sm text-gray-500">
            Update associate details
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

          <form onSubmit={submit} className="space-y-6">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Input label="Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email || ""} onChange={handleChange} />
              <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />

              {/* ROLE */}
              <div>
                <label className="label">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="manager">Manager</option>
                  <option value="associate">Associate</option>
                  <option value="sub_associate">Sub Associate</option>
                </select>
              </div>

              {/* GENDER */}
              <div>
                <label className="label">Gender</label>
                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            {/* ACTION */}
            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {saving ? "Saving..." : "Update Associate"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAssociate;


/* REUSABLE INPUT */
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