import axios from "axios";

// Base URL
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


// Get all competitions in which a user participates
export const getUserParticipations = async (userId) => {
  const response = await axios.get(
    `${API_URL}/api/participation/user/${userId}`
  );

  return response.data;
};


// Register a user for a competition
export const registerForCompetition = async (
  userId,
  competitionId
) => {
  const response = await axios.post(
    `${API_URL}/api/participation`,
    {
      userId,
      competitionId,
    }
  );

  return response.data;
};


// Submit competition
export const submitCompetition = async (
  participationId,
  submissionData
) => {
  const response = await axios.post(
    `${API_URL}/api/participation/${participationId}/submission`,
    submissionData
  );

  return response.data;
};