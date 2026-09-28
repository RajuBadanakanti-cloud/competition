const Rewards = ({ competition }) => {
  // Get rewards from the competition data.
  // This will eventually come from MongoDB.
  const rewards = competition?.rewards || [];

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Prizes
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Rewards
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Rewards available for the top-performing participants.
          </p>
        </div>

        {/* Rewards card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          {rewards.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {rewards.map((reward, index) => (
                <div
                  key={reward._id || index}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:bg-indigo-50/40"
                >

                  {/* Position */}
                  <p className="text-sm font-semibold text-indigo-600">
                    {reward.position || `${index + 1}${getPositionSuffix(index + 1)} Prize`}
                  </p>

                  {/* Reward amount */}
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    ₹{Number(reward.amount || 0).toLocaleString("en-IN")}
                  </p>

                  {/* Reward description */}
                  {reward.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {reward.description}
                    </p>
                  )}

                </div>
              ))}

            </div>
          ) : (
            // Display this when no rewards are available.
            <div className="rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                Reward details are not available yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

// Return the correct suffix for a prize position.
const getPositionSuffix = (position) => {
  if (position === 1) return "st";
  if (position === 2) return "nd";
  if (position === 3) return "rd";

  return "th";
};

export default Rewards;