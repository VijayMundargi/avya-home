import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setCustomers(data);
    } catch (err) {
      console.error(err);
      setCustomers([]);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">Customers</h2>

        <Link
          to="/customers/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
        >
          + Add Customer
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Paid</th>
                <th className="p-3 text-left">Balance</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">

                    <td className="p-3 font-medium">
                      {c.name}
                    </td>

                    <td className="p-3">
                      {c.mobile}
                    </td>

                    <td className="p-3">
                      ₹{c.total_amount || 0}
                    </td>

                    <td className="p-3 text-green-600 font-medium">
                      ₹{c.amount_paid || 0}
                    </td>

                    <td className="p-3 text-red-600 font-medium">
                      ₹{c.balance_due || 0}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          c.status === "sold_out"
                            ? "bg-green-100 text-green-600"
                            : c.status === "active"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="p-3">
                      <Link
                        to={`/customers/${c.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-500">
                    No Customers Found
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

export default CustomerList;