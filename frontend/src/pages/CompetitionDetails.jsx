import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CompetitionHero from "../components/CompetitionHero";
import CompetitionOverview from "../components/CompetitionOverview";
import ImportantDates from "../components/ImportantDates";
import ParticipationCard from "../components/ParticipationCard";
import JudgeCard from "../components/JudgeCard";
import Rewards from "../components/Rewards";
import Rules from "../components/Rules";
import JudgingParameters from "../components/JudgingParameters";
import PreviousWinners from "../components/PreviousWinners";
import SubmissionForm from "../components/SubmissionForm";

import { getCompetitionById } from "../services/competitionApi";
import { getUserParticipations } from "../services/participationApi";

const CompetitionDetails = () => {
  // Temporary demo user
  // Use the same real User _id that you used during registration
const DEMO_USER_ID = "6aba20180dd0b90fe7958560"; // just for testing

  // Get competition ID from:
  // /competition/:id
  const { id } = useParams();

  // Store competition information
  const [competition, setCompetition] = useState(null);

  // Store current user's participation
  const [participation, setParticipation] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------
        // 1. Get competition
        // --------------------------------
        const competitionData =
          await getCompetitionById(id);

        setCompetition(
          competitionData.competition
        );

        // --------------------------------
        // 2. Get user's participation
        // --------------------------------
        try {
          const participationData =
            await getUserParticipations(DEMO_USER_ID);

          const currentParticipation =
            participationData.participations.find(
              (item) =>
                item.competition?._id === id
            );

          setParticipation(
            currentParticipation || null
          );

        } catch (participationError) {
          // User has no participation
          setParticipation(null);
        }

      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to load competition."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionData();

  }, [id]);


  // --------------------------------
  // Loading state
  // --------------------------------
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading competition...
        </p>
      </div>
    );
  }


  // --------------------------------
  // Error state
  // --------------------------------
  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">

          <h2 className="font-semibold text-red-700">
            Unable to load competition
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

        </div>
      </div>
    );
  }


  // --------------------------------
  // Competition does not exist
  // --------------------------------
  if (!competition) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Competition not found.
        </p>
      </div>
    );
  }


  // --------------------------------
  // Competition Details
  // --------------------------------
  return (
    <main>

      <CompetitionHero
        competition={competition}
        participation={participation}
      />

      <CompetitionOverview
        competition={competition}
      />

      <ImportantDates
        competition={competition}
      />

      <ParticipationCard
        competition={competition}
        participation={participation}
        onRegister={(newParticipation) => {
          setParticipation(newParticipation);
        }}
      />

      <JudgeCard
        competition={competition}
      />

      <Rewards
        competition={competition}
      />

      <Rules
        competition={competition}
      />

      <JudgingParameters
        competition={competition}
      />

      <PreviousWinners
        competition={competition}
      />

      <SubmissionForm
        competition={competition}
        participation={participation}
        onSubmit={(updatedParticipation) => {
          setParticipation(updatedParticipation);
        }}
      />

    </main>
  );
};

export default CompetitionDetails;