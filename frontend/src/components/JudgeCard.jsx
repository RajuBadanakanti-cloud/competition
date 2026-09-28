const JudgeCard = ({ competition }) => {
  const judge = competition?.judge;

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Competition Team
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Meet the Judge
          </h2>
        </div>

        {/* Judge card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

          <div className="flex flex-col sm:flex-row">

            {/* Judge profile area */}
            <div className="flex items-center gap-4 bg-linear-to-br from-indigo-600 to-violet-600 p-6 sm:w-2/5 sm:flex-col sm:items-start sm:justify-center sm:p-8">

              {/* Profile */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20">

                {judge?.image ? (
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  judge?.name?.charAt(0).toUpperCase() || "J"
                )}

              </div>

              <div>
                <p className="text-xl font-bold text-white">
                  {judge?.name || "Not specified"}
                </p>

                <p className="mt-1 text-sm text-indigo-100">
                  Competition Judge
                </p>
              </div>

            </div>

            {/* Judge information */}
            <div className="flex-1 p-6 sm:p-8">

              <h3 className="text-lg font-semibold text-slate-900">
                About the Judge
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                The competition entries will be evaluated by the assigned
                judge based on the competition's judging parameters and
                submission guidelines.
              </p>

              {/* Evaluation information */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    Competition Judge
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Experience
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {judge?.experience || "Not specified"}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default JudgeCard;