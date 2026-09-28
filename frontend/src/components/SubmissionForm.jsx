import { useState } from "react";
import { submitCompetition } from "../services/participationApi";

const SubmissionForm = ({
  participation,
  competition,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!participation) {
    return null;
  }

  if (participation.status === "submitted") {
    return (
      <section className="bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-emerald-50 p-6 text-center">
            <h2 className="text-xl font-bold text-emerald-700">
              Submission Completed ✓
            </h2>

            <p className="mt-2 text-sm text-emerald-600">
              Your competition submission has been received.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (competition.status !== "submission_open") {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await submitCompetition(
        participation._id,
        {
          title,
          fileUrl,
        }
      );

      onSubmit(data.participation);

      setTitle("");
      setFileUrl("");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Submission failed."
      );
    } finally {
      setLoading(false);
    }
  };


console.log("SUBMISSION FORM");
console.log("Participation:", participation);
console.log("Competition status:", competition?.status);


  return (
    <section className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Submission
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Submit Your Project
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            <div>
              <label className="text-sm font-medium text-slate-700">
                Project Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Enter your project title"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Project URL
              </label>

              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="https://..."
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Project"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SubmissionForm;