import { Link } from "react-router-dom";

const CompetitionHero = ({ competition, participation }) => {
  // Temporary fallback data
  // Later this will come from the backend.
  const {
    title = "AI Innovation Challenge",
    description = "Build innovative solutions and showcase your skills in this exciting competition.",
    prizePool = 50000,
    registeredCount = 120,
    maxParticipants = 500,
    status = "registration_open",
  } = competition || {};

  const remainingSpots = Math.max(
    maxParticipants - registeredCount,
    0
  );

  const isRegistered = Boolean(participation);

  const statusConfig = {
    upcoming: {
      label: "Upcoming",
      className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    },

    registration_open: {
      label: "Registration Open",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    },

    registration_closed: {
      label: "Registration Closed",
      className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    },

    submission_open: {
      label: "Submission Open",
      className: "bg-violet-50 text-violet-700 ring-violet-600/20",
    },

    completed: {
      label: "Completed",
      className: "bg-slate-100 text-slate-600 ring-slate-500/20",
    },
  };

  const currentStatus =
    statusConfig[status] || statusConfig.upcoming;

  const canRegister =
    status === "registration_open" &&
    !isRegistered &&
    remainingSpots > 0;

  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* Back navigation */}
        <Link
          to="/competitions"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <span className="text-lg">←</span>
          Back to Competitions
        </Link>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

          {/* Banner */}
          <div className="relative h-48 overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-600 sm:h-64 lg:h-80">

            {/* Decorative circles */}
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-40 border-white/10" />

            <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full border-50 border-white/10" />

            {/* Competition image */}
            {competition?.imageUrl && (
              <img
                src={competition.imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

            {/* Status */}
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset sm:text-sm ${currentStatus.className}`}
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                {currentStatus.label}
              </span>
            </div>

          </div>

          {/* Content */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* Main information */}
            <div className="lg:flex lg:items-start lg:justify-between lg:gap-10">

              <div className="max-w-3xl">

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  {description}
                </p>

              </div>

              {/* Prize */}
              <div className="mt-6 shrink-0 lg:mt-0 lg:min-w-40 lg:text-right">

                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Prize Pool
                </p>

                <p className="mt-1 text-2xl font-bold text-indigo-600 sm:text-3xl">
                  ₹{Number(prizePool).toLocaleString("en-IN")}
                </p>

              </div>

            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3 sm:gap-4">

              {/* Participants */}
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400 sm:text-sm">
                  Participants
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                  {registeredCount}
                  <span className="ml-1 text-sm font-normal text-slate-400">
                    / {maxParticipants}
                  </span>
                </p>
              </div>

              {/* Remaining spots */}
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400 sm:text-sm">
                  Spots Left
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                  {remainingSpots}
                </p>
              </div>

              {/* Availability */}
              <div className="col-span-2 rounded-xl bg-slate-50 p-4 sm:col-span-1">
                <p className="text-xs font-medium text-slate-400 sm:text-sm">
                  Availability
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                  {remainingSpots > 0 ? "Available" : "Full"}
                </p>
              </div>

            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

              {isRegistered ? (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-default rounded-xl bg-emerald-50 px-6 py-3.5 text-sm font-semibold text-emerald-700 sm:w-auto"
                >
                  ✓ You are Registered
                </button>
              ) : canRegister ? (
                <button
                  type="button"
                  className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Register Now
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-slate-100 px-7 py-3.5 text-sm font-semibold text-slate-400 sm:w-auto"
                >
                  {status === "completed"
                    ? "Competition Completed"
                    : status === "registration_closed"
                    ? "Registration Closed"
                    : remainingSpots === 0
                    ? "Competition Full"
                    : "Registration Not Available"}
                </button>
              )}

              {isRegistered && (
                <span className="text-center text-sm text-slate-500 sm:text-left">
                  You can participate in this competition.
                </span>
              )}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionHero;