import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const WelcomeLetterPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState(state?.user || null);
  const [loading, setLoading] = useState(false);

  // 🔒 SECURITY
  if (user?.role !== "super_admin") {
    return <div className="p-6 text-red-500">Access Denied</div>;
  }

  // ✅ Fetch if no state
  useEffect(() => {
    if (!profile) {
      setLoading(true);
      api.get("/me")
        .then(res => setProfile(res.data.user))
        .catch(() => alert("Failed to load data"))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!profile) {
    return (
      <div className="p-6 text-center">
        No data found
        <br />
        <button onClick={() => navigate("/associates")} className="mt-4 text-blue-600">
          Go Back
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div id="letter" className="max-w-2xl mx-auto bg-white p-10 shadow rounded">

        {/* TITLE */}
        <h1 className="text-center text-xl font-bold mb-8">
          WELCOME LETTER
        </h1>

        {/* DATE */}
        <p className="text-sm text-right mb-6">{today}</p>

        {/* BODY */}
        <p className="mb-4">
          Dear <b>{profile.name}</b>,
        </p>

        <p className="mb-4">
          Welcome to <b>Avya Home Private Limited</b>! We are thrilled to have you
          join our team and look forward to working with you.
        </p>

        <p className="mb-4">
          Your association with us begins immediately, and your role will be{" "}
          <b>{profile.role}</b>. In this position, you will contribute to growing
          our network and expanding business opportunities.
        </p>

        <p className="mb-4">
          At Avya Home, we pride ourselves on our values, teamwork, and commitment
          to excellence. We believe that your skills and dedication will play an
          important role in our success.
        </p>

        <p className="mb-4">
          Your onboarding process will begin right away, and you will receive the
          necessary support to get started. If you have any questions, feel free
          to reach out to us at any time.
        </p>

        <p className="mb-6">
          Once again, welcome to the team. We are excited to have you on board!
        </p>

        {/* SIGNATURE */}
        <p className="mt-8">
          Best regards,<br />
          <b>Avya Team</b>
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print
          </button>
        </div>

      </div>

      {/* PRINT CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #letter, #letter * {
            visibility: visible;
          }
          #letter {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none;
          }
        }
      `}</style>

    </div>
  );
};

export default WelcomeLetterPage;