import { useEffect, useState } from "react";
import { getAssociates } from "../../api/associate.api";
import { useNavigate } from "react-router-dom";

const getRoleStyle = (role) => {
  switch (role) {
    case "super_admin":
      return "bg-red-100 text-red-600";
    case "manager":
      return "bg-purple-100 text-purple-600";
    case "associate":
      return "bg-blue-100 text-blue-600";
    case "sub_associate":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const formatRole = (role) => {
  return role.replace("_", " ").toUpperCase();
};

const AssociateList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ FIXED (moved inside component)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAssociates();
        setData(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6">

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Associates
        </h1>
        <p className="text-sm text-gray-500">
          Manage all associates in your system
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Action</th> {/* ✅ added */}
                  </tr>
                </thead>

                <tbody>
                  {data.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {u.name}
                      </td>

                      <td className="p-4 text-gray-600">
                        {u.mobile}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${getRoleStyle(
                            u.role
                          )}`}
                        >
                          {formatRole(u.role)}
                        </span>
                      </td>

                      {/* ✅ EDIT BUTTON */}
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/associates/edit/${u.id}`)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                        >
                          Edit
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden space-y-4 p-4">
              {data.map((u) => (
                <div
                  key={u.id}
                  className="border rounded-xl p-4 shadow-sm"
                >
                  <p className="font-semibold text-gray-800">{u.name}</p>

                  <p className="text-sm text-gray-500">{u.mobile}</p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${getRoleStyle(
                      u.role
                    )}`}
                  >
                    {formatRole(u.role)}
                  </span>

                  {/* ✅ MOBILE EDIT */}
                  <div className="mt-3">
                    <button
                      onClick={() => navigate(`/associates/edit/${u.id}`)}
                      className="text-blue-600 text-sm underline"
                    >
                      Edit
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssociateList; 