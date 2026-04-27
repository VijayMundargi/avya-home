import React, { useState } from "react";
import axios from "axios";

const CreateCustomer = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    aadhar_number: "",
    pan_number: "",
    address: "",
    nominee_name: "",
    nominee_relation: "",
  });

  const [files, setFiles] = useState({
    aadhar_doc: null,
    pan_doc: null,
    photo: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    Object.keys(files).forEach((k) => {
      if (files[k]) fd.append(k, files[k]);
    });

    try {
      await axios.post("http://localhost:5000/api/customer/kyc", fd);
      alert("Customer Created Successfully");
    } catch (err) {
      console.error(err);
      alert("Error creating customer");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* CARD */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">Customer KYC</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* ===== BASIC INFO ===== */}
          <h3 className="md:col-span-2 font-semibold text-gray-700">
            Basic Information
          </h3>

          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Mobile</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* ===== KYC ===== */}
          <h3 className="md:col-span-2 font-semibold text-gray-700 mt-4">
            KYC Details
          </h3>

          <div>
            <label className="text-sm text-gray-600">Aadhar Number</label>
            <input
              name="aadhar_number"
              value={form.aadhar_number}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">PAN Number</label>
            <input
              name="pan_number"
              value={form.pan_number}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* FILE UPLOADS */}
          <div>
            <label className="text-sm text-gray-600">Aadhar Document</label>
            <input type="file" name="aadhar_doc" onChange={handleFile} />
          </div>

          <div>
            <label className="text-sm text-gray-600">PAN Document</label>
            <input type="file" name="pan_doc" onChange={handleFile} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Photo</label>
            <input type="file" name="photo" onChange={handleFile} />
          </div>

          {/* ===== NOMINEE ===== */}
          <h3 className="md:col-span-2 font-semibold text-gray-700 mt-4">
            Nominee Details
          </h3>

          <div>
            <label className="text-sm text-gray-600">Nominee Name</label>
            <input
              name="nominee_name"
              value={form.nominee_name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Relation</label>
            <input
              name="nominee_relation"
              value={form.nominee_relation}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit KYC
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;