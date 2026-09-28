const PreviousWinners = ({ competition }) => {
  // Get previous winners from the competition data.
  // This data will eventually come from MongoDB.
  const winners = competition?.previousWinners || [];

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Competition History
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Previous Winners
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Explore participants who won previous editions of this competition.
          </p>
        </div>

        {/* Winners card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          {winners.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {winners.map((winner, index) => (
                <div
                  key={winner._id || index}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:bg-indigo-50/40"
                >

                  {/* Winner position */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {winner.position || `${index + 1}${getPositionSuffix(index + 1)} Place`}
                    </span>

                    {winner.year && (
                      <span className="text-sm font-medium text-slate-400">
                        {winner.year}
                      </span>
                    )}
                  </div>

                  {/* Winner name */}
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {winner.name || "Winner"}
                  </h3>

                  {/* Winner project */}
                  {winner.project && (
                    <p className="mt-1 text-sm text-slate-500">
                      {winner.project}
                    </p>
                  )}

                </div>
              ))}

            </div>
          ) : (
            // Display this when there are no previous winners.
            <div className="rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                Previous winner information is not available yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};


// Return the correct suffix for the winner position.
const getPositionSuffix = (position) => {
  if (position === 1) return "st";
  if (position === 2) return "nd";
  if (position === 3) return "rd";

  return "th";
};

export default PreviousWinners;