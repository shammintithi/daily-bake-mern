import api from "./api";

// Get all users (Admin)
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Delete user (Admin)
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Update user details/role (Admin)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};
