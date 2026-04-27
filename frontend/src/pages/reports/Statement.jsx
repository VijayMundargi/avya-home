import React, { useEffect, useState } from "react";
import axios from "axios";

const Statement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/reports/payments").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2>Statement</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map(d => (
            <tr key={d.id}>
              <td>{d.customer_name}</td>
              <td>{d.amount}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statement;