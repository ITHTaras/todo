import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

// GetGoals
const getGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const addGoal = async (goalData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  // console.log(config);

  const response = await axios.post(API_URL, goalData, config);

  // console.log(response.data);

  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  // console.log(response.data);

  return response.data;
};

const goalService = {
  addGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
