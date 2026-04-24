import { useState } from "react";
import { resetPassword } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await resetPassword(form);
      setMessage("Password reset successful");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Reset Password 
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter OTP and set a new password
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-sm text-center p-2 rounded bg-blue-50 text-blue-600">
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-600">OTP</label>
            <input
              name="otp"
              placeholder="Enter OTP"
              className="w-full mt-1 border rounded-lg p-3 tracking-widest text-center focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Remember password?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;