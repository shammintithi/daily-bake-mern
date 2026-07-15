import api from "./api";

// Get dashboard statistics (Admin)
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};
