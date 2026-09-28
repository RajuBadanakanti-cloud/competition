import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserParticipations } from "../services/participationApi";

const DEMO_USER_ID = "6aba542c8e59cebdafe51fd7";

const MyCompetitions = () => {
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCompetitions = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUserParticipations(DEMO_USER_ID);

        setParticipations(data.participations || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to load your competitions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCompetitions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading your competitions...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            My Competitions
          </h1>

          <p className="mt-2 text-slate-500">
            Track the competitions you have joined.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && participations.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              No competitions yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Join a competition to see it here.
            </p>

            <button
              onClick={() => navigate("/competitions")}
              className="mt-5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white"
            >
              Explore Competitions
            </button>
          </div>
        )}

        {/* Competitions */}
        {participations.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {participations.map((item) => {
              const competition = item.competition;

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-indigo-600">
                    Competition
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {competition?.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {competition?.description}
                  </p>

                  {/* Status */}
                  <div className="mt-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "submitted"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "completed"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Prize Pool
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        ₹
                        {Number(
                          competition?.prizePool || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Registered
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {new Date(
                          item.registeredAt
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                  </div>

                  {/* View button */}
                  <button
                    onClick={() =>
                      navigate(
                        `/competition/${competition?._id}`
                      )
                    }
                    className="mt-5 w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    View Details
                  </button>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
};

export default MyCompetitions;