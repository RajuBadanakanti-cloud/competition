const Rules = ({ competition }) => {
  // Get the rules from the competition data.
  // The data will eventually come from MongoDB.
  const rules = competition?.rules || [];

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Guidelines
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Rules & Guidelines
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Please review the competition rules before participating.
          </p>
        </div>

        {/* Rules card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          {rules.length > 0 ? (
            <div className="space-y-3">

              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                >

                  {/* Rule number */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600">
                    {index + 1}
                  </div>

                  {/* Rule content */}
                  <p className="pt-1 text-sm leading-6 text-slate-600 sm:text-base">
                    {rule}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            // Display this when the competition has no rules.
            <div className="rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">
                Competition rules are not available yet.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Rules;

