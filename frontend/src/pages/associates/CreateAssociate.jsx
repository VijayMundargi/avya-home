import { useState } from "react";
import { createAssociate } from "../../api/associate.api";
import toast from "../../utils/toast"; // ✅ use toast

const CreateAssociate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "associate",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!form.name || !form.mobile || !form.password) {
      toast.error("Name, mobile and password are required");
      return;
    }

    setLoading(true);

    try {
      await createAssociate(form);

      toast.success("Associate created successfully"); // ✅ replaced alert

      // OPTIONAL: reset form
      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "associate",
        gender: "",
      });

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";

      toast.error(message); // ✅ replaced setError
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Associate
          </h1>
          <p className="text-gray-500 text-sm">
            Add a new associate to your system
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">

          <form onSubmit={submit} className="space-y-8">

            {/* BASIC INFO */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
                <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
                <Input type="password" label="Password" name="password" value={form.password} onChange={handleChange} />

              </div>
            </div>

            {/* ROLE & PERSONAL */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Role & Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="label">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="associate">Associate</option>
                    <option value="manager">Manager</option>
                    <option value="sub_associate">Sub Associate</option>
                  </select>
                </div>

                <div>
                  <label className="label">Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end border-t pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                {loading ? "Creating..." : "Create Associate"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssociate;


/* 🔹 REUSABLE INPUT */
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