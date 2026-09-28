const JudgingParameters = ({ competition }) => {
  // Get judging parameters from the competition data.
  // These values will eventually come from MongoDB.
  const parameters = competition?.judgingParameters || [];

  // Calculate the total percentage.
  const totalPercentage = parameters.reduce(
    (total, parameter) => total + Number(parameter.weight || 0),
    0
  );

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Evaluation
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Judging Parameters
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Submissions will be evaluated based on the following criteria.
          </p>
        </div>

        {/* Parameters card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          {parameters.length > 0 ? (
            <div className="space-y-5">

              {parameters.map((parameter, index) => {
                const weight = Number(parameter.weight || 0);

                return (
                  <div key={parameter._id || index}>

                    {/* Parameter name and percentage */}
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {parameter.name}
                        </h3>

                        {parameter.description && (
                          <p className="mt-1 text-sm text-slate-500">
                            {parameter.description}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-sm font-bold text-indigo-600">
                        {weight}%
                      </span>

                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-indigo-600 to-violet-600 transition-all duration-500"
                        style={{
                          width: `${Math.min(weight, 100)}%`,
                        }}
                      />
                    </div>

                  </div>
                );
              })}

              {/* Total percentage */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="font-semibold text-slate-700">
                  Total Weight
                </span>

                <span
                  className={`font-bold ${
                    totalPercentage === 100
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {totalPercentage}%
                </span>
              </div>

            </div>
          ) : (
            // Display this when no judging parameters are available.
            <div className="rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                Judging parameters are not available yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default JudgingParameters