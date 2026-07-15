import api from "./api";

// Place a new order
export const placeOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get current user's orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/myorders");
  return response.data;
};

// Get single order details
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Mark order as delivered (Admin)
export const markOrderDelivered = async (id) => {
  const response = await api.put(`/orders/${id}/deliver`);
  return response.data;
};
