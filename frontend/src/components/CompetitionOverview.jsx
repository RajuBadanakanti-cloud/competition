const CompetitionOverview = ({ competition }) => {
const {
  description = "This competition gives participants an opportunity to showcase their skills, creativity, and innovative ideas.",
  entryFee = 0,
  prizePool = 0,
  maxParticipants = 0,
  registeredCount = 0,
  judge,
} = competition || {};

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            About Competition
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Competition Overview
          </h2>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              About this competition
            </h3>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500 sm:text-base">
              {description}
            </p>
          </div>

          {/* Information Grid */}
          <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Entry Fee */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">
                Entry Fee
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {entryFee === 0
                  ? "Free"
                  : `₹${Number(entryFee).toLocaleString("en-IN")}`}
              </p>
            </div>

            {/* Prize Pool */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">
                Prize Pool
              </p>

              <p className="mt-1 text-lg font-bold text-indigo-600">
                ₹{Number(prizePool).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Participants */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">
                Participants
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {registeredCount} / {maxParticipants}
              </p>
            </div>

            {/* Judge */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">
                Judge
              </p>

              <p className="mt-1 truncate text-lg font-bold text-slate-900">
              {judge?.name || "Not specified"}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CompetitionOverview;