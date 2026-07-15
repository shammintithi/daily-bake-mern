import api from "./api";

// Get user cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add product to cart
export const addToCart = async (productId) => {
  const response = await api.post("/cart", { productId });
  return response.data;
};

// Update cart quantity
export const updateCartQuantity = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, { quantity });
  return response.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
