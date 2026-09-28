const ImportantDates = ({ competition }) => {
  const {
    registrationStart,
    registrationEnd,
    submissionStart,
    submissionEnd,
  } = competition || {};

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const dates = [
    {
      title: "Registration Starts",
      date: registrationStart,
      icon: "01",
    },
    {
      title: "Registration Ends",
      date: registrationEnd,
      icon: "02",
    },
    {
      title: "Submission Starts",
      date: submissionStart,
      icon: "03",
    },
    {
      title: "Submission Ends",
      date: submissionEnd,
      icon: "04",
    },
  ];

  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Competition Timeline
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Important Dates
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Keep track of registration and submission deadlines.
          </p>
        </div>

        {/* Dates Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {dates.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:bg-indigo-50/40"
              >

                {/* Number */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-sm">
                  {item.icon}
                </div>

                {/* Date Info */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                    {formatDate(item.date)}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ImportantDates;