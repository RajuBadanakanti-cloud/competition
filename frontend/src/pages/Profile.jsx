import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DEMO_USER_ID = "6aba20180dd0b90fe7958560";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/user/${DEMO_USER_ID}`
        );

        setUser(response.data.user);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          User not found.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 p-6 sm:p-8">
            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white ring-1 ring-white/30">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.name}
                </h2>

                <p className="mt-1 text-indigo-100">
                  Competition Participant
                </p>
              </div>

            </div>
          </div>

          {/* Information */}
          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {user.name}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                Email
              </p>

              <p className="mt-1 break-all font-semibold text-slate-900">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                Age
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {user.age}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                User ID
              </p>

              <p className="mt-1 break-all font-semibold text-slate-900">
                {user._id}
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="border-t border-slate-100 p-6 sm:p-8">

            <button
              onClick={() => navigate("/my-competitions")}
              className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              My Competitions
            </button>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Profile;