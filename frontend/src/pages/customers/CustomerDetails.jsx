import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/customers/${id}`);
      setCustomer(res.data);

      const pay = await axios.get(`/api/payments/${id}`);

      const paymentData = Array.isArray(pay.data)
        ? pay.data
        : pay.data.data || [];

      setPayments(paymentData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {customer.name || "Customer Details"}
        </h2>

        <Link
          to="/payments/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Payment
        </Link>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Amount</p>
          <h3 className="text-lg font-semibold">₹{customer.total_amount || 0}</h3>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Paid</p>
          <h3 className="text-lg font-semibold">₹{customer.amount_paid || 0}</h3>
        </div>

        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Balance</p>
          <h3 className="text-lg font-semibold">₹{customer.balance_due || 0}</h3>
        </div>
      </div>

      {/* CUSTOMER INFO CARD */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="text-md font-semibold mb-4">Customer Info</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Mobile:</strong> {customer.mobile || "-"}</p>
          <p><strong>Email:</strong> {customer.email || "-"}</p>
          <p><strong>Aadhar:</strong> {customer.aadhar_number || "-"}</p>
          <p><strong>PAN:</strong> {customer.pan_number || "-"}</p>
          <p><strong>Nominee:</strong> {customer.nominee_name || "-"}</p>
          <p><strong>Relation:</strong> {customer.nominee_relation || "-"}</p>
        </div>
      </div>

      {/* PAYMENT TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <div className="p-4 border-b">
          <h3 className="text-md font-semibold">Payment History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Mode</th>
                <th className="p-3 text-left">Bank</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">
                      {p.deposit_date || "-"}
                    </td>

                    <td className="p-3 font-medium text-blue-600">
                      ₹{p.amount}
                    </td>

                    <td className="p-3 capitalize">
                      {p.payment_mode || "-"}
                    </td>

                    <td className="p-3">
                      {p.bank || "-"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          p.status === "received"
                            ? "bg-green-100 text-green-600"
                            : p.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No Payments Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetails;