import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/payments");

      const payments = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setData(payments);

    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">Payments</h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.customer_id}</td>
                    <td className="p-3">₹{p.amount}</td>
                    <td className="p-3">{p.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
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

export default PaymentList;