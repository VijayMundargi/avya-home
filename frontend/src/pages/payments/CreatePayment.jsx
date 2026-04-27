import React, { useState } from "react";
import axios from "axios";

const CreatePayment = () => {
  const [data, setData] = useState({
    customer_id: "",
    amount: "",
    payment_mode: "cash",
    status: "received",
    bank: "",
    cheque_no: "",
    deposit_date: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/payments", data);
      alert("Payment Added");
    } catch (err) {
      console.error(err);
      alert("Error adding payment");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">Add Payment</h2>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              name="amount"
              value={data.amount}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Payment Mode */}
          <div>
            <label className="text-sm text-gray-600">Payment Mode</label>
            <select
              name="payment_mode"
              value={data.payment_mode}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="cash">Cash</option>
              <option value="rtgs_neft">RTGS / NEFT</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>

          {/* Bank */}
          <div>
            <label className="text-sm text-gray-600">Bank</label>
            <input
              name="bank"
              value={data.bank}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Bank name"
            />
          </div>

          {/* Cheque No */}
          <div>
            <label className="text-sm text-gray-600">Cheque No</label>
            <input
              name="cheque_no"
              value={data.cheque_no}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Cheque number"
            />
          </div>

          {/* Deposit Date */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Deposit Date</label>
            <input
              type="date"
              name="deposit_date"
              value={data.deposit_date}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Payment
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePayment;