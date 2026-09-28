import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get all competitions
export const getAllCompetitions = async () => {
  const response = await axios.get(
    `${API_URL}/api/competition`
  );

  return response.data;
};

// Get single competition
export const getCompetitionById = async (competitionId) => {
  const response = await axios.get(
    `${API_URL}/api/competition/${competitionId}`
  );

  return response.data;
};