import { useState } from "react";
import { registerForCompetition } from "../services/participationApi";

const DEMO_USER_ID = "6aba542c8e59cebdafe51fd7"; // just for testing..

const ParticipationCard = ({
  participation,
  competition,
  onRegister,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegistered = !!participation;

  // Debug information
  console.log("Competition:", competition);
  console.log("Competition status:", competition?.status);
  console.log("Participation:", participation);
  console.log("Demo user:", DEMO_USER_ID);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Register clicked");
      console.log("User ID:", DEMO_USER_ID);
      console.log("Competition ID:", competition?._id);

      const data = await registerForCompetition(
        DEMO_USER_ID,
        competition._id
      );

      console.log("Registration response:", data);

      onRegister(data.participation);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Information */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Participation
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {isRegistered
                  ? "You are registered"
                  : "Join this competition"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {isRegistered
                  ? "You can submit your project when submissions open."
                  : "Register now to participate in this competition."}
              </p>
            </div>

            {/* Actions */}

            {/* Already registered */}
            {isRegistered && (
              <div className="rounded-xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                Registered ✓
              </div>
            )}

            {/* Registration open */}
            {!isRegistered &&
              competition?.status === "registration_open" && (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Registering..."
                    : "Register Now"}
                </button>
              )}

            {/* Registration not open */}
            {!isRegistered &&
              competition?.status !== "registration_open" && (
                <div className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600">
                  {competition?.status === "upcoming" &&
                    "Registration not started"}

                  {competition?.status === "registration_closed" &&
                    "Registration closed"}

                  {competition?.status === "submission_open" &&
                    "Registration closed"}

                  {competition?.status === "completed" &&
                    "Competition completed"}

                  {!competition?.status &&
                    "Registration unavailable"}
                </div>
              )}

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ParticipationCard;