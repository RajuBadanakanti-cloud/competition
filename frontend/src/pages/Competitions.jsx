import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompetitions } from "../services/competitionApi";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await getAllCompetitions();
        setCompetitions(data.competitions || []);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message ||
          "Failed to load competitions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Loading competitions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Explore
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Competitions
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Discover competitions and showcase your skills.
          </p>
        </div>

        {/* Competition Cards */}
        {competitions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">
              No competitions available.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {competitions.map((competition) => (
              <div
                key={competition._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-indigo-600">
                  Competition
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {competition.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                  {competition.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Prize Pool
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      ₹{Number(competition.prizePool || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Participants
                    </p>
                    <p className="mt-1 font-bold text-slate-900">
                      {competition.registeredCount || 0} /{" "}
                      {competition.maxParticipants || 0}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/competition/${competition._id}`)
                  }
                  className="mt-5 w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Details
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
};

export default Competitions;