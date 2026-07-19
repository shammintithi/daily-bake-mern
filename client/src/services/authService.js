import api from "./api";

// REGISTER
export const registerUser = async (userData) => {
const response = await api.post(
"/auth/register",
userData
);

return response.data;
};

// LOGIN
export const loginUser = async (userData) => {
const response = await api.post(
"/auth/login",
userData
);

return response.data;
};

// GET PROFILE
export const getProfile = async (token) => {
const response = await api.get(
"/auth/profile",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// UPDATE PROFILE
export const updateUserProfile = async (
userData,
token
) => {
const response = await api.put(
"/auth/profile",
userData,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// UPDATE PASSWORD
export const updateUserPassword = async (
passwordData,
token
) => {
const response = await api.put(
"/auth/password",
passwordData,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// UPDATE ADDRESS
export const updateUserAddress = async (
addressData,
token
) => {
const response = await api.put(
"/auth/address",
addressData,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};
