import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const [data, setData] = useState({
    customer_id: "",
    plot_id: "",
    promoter_id: "",
    booking_amount: "",
    booking_date: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/bookings", data);
      alert("Plot Booked Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error booking plot");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* CARD */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">Plot Booking</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Customer ID */}
          <div>
            <label className="text-sm text-gray-600">Customer ID</label>
            <input
              name="customer_id"
              value={data.customer_id}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter Customer ID"
              required
            />
          </div>

          {/* Plot ID */}
          <div>
            <label className="text-sm text-gray-600">Plot ID</label>
            <input
              name="plot_id"
              value={data.plot_id}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter Plot ID"
              required
            />
          </div>

          {/* Promoter */}
          <div>
            <label className="text-sm text-gray-600">Promoter (Associate ID)</label>
            <input
              name="promoter_id"
              value={data.promoter_id}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter Promoter ID"
            />
          </div>

          {/* Booking Amount */}
          <div>
            <label className="text-sm text-gray-600">Booking Amount</label>
            <input
              name="booking_amount"
              value={data.booking_amount}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Booking Date */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Booking Date</label>
            <input
              type="date"
              name="booking_date"
              value={data.booking_date}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Plot
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Booking;