import axios from "axios";

// Base URL for competition APIs

const API_URL = import.meta.VITE_API_URL || "http://localhost:5000";


// all
export const getAllCompetitions = async () => {
  const response = await axios.get(`${API_URL}/api/competition`);
  return response.data;
};

// Get a single competition by ID
export const getCompetitionById = async (competitionId) => {
  const response = await axios.get(
    `${API_URL}/${competitionId}`
  );

  return response.data;
};
