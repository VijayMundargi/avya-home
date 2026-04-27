import { useState, useEffect } from "react";
import api from "../../api/axios";

const Profile = () => {
  // ✅ FIX 1: Proper initial state (no undefined)
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    date_of_birth: "",
    address: "",
    pan_number: "",
    aadhar_number: "",
    bank_name: "",
    bank_account: "",
    bank_ifsc: "",
    nominee_name: "",
    nominee_relation: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/me");

      // ✅ FIX 2: Safe merge (avoid undefined fields)
      setForm((prev) => ({
        ...prev,
        ...res.data.user,
      }));
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/associate/${form.id}`, form);
      alert("Profile updated");
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Profile
          </h1>
          <p className="text-sm text-gray-500">
            Manage your personal and KYC details
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">

          {/* PERSONAL INFO */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />

              <div>
                <label className="label">Gender</label>
                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <Input
                type="date"
                label="Date of Birth"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
              />

              <div className="md:col-span-2">
                <label className="label">Address</label>
                <textarea
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                  className="input"
                  rows={3}
                />
              </div>

            </div>
          </div>

          {/* KYC */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              KYC Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="PAN Number" name="pan_number" value={form.pan_number} onChange={handleChange} />
              <Input label="Aadhar Number" name="aadhar_number" value={form.aadhar_number} onChange={handleChange} />
            </div>
          </div>

          {/* BANK */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Bank Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Bank Name" name="bank_name" value={form.bank_name} onChange={handleChange} />
              <Input label="Account Number" name="bank_account" value={form.bank_account} onChange={handleChange} />
              <Input label="IFSC Code" name="bank_ifsc" value={form.bank_ifsc} onChange={handleChange} />
            </div>
          </div>

          {/* NOMINEE */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Nominee Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nominee Name" name="nominee_name" value={form.nominee_name} onChange={handleChange} />
              <Input label="Relation" name="nominee_relation" value={form.nominee_relation} onChange={handleChange} />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end sticky bottom-0 bg-gray-50 py-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Profile;

/* 🔥 FIXED INPUT COMPONENT */
const Input = ({ label, value, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input
      {...props}
      value={value || ""}  
      className="input"
    />
  </div>
);