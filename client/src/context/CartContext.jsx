import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import * as cartService from "../services/cartService";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("guestCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);

  // Sync / Fetch cart from backend on login or token change
  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const serverCart = await cartService.getCart();
          const serverItems = serverCart.items || [];
          
          const mappedItems = serverItems.map((item) => ({
            id: item.product?._id || item.product?.id,
            _id: item.product?._id || item.product?.id,
            name: item.product?.name,
            price: item.product?.price,
            image: item.product?.image,
            category: item.product?.category,
            quantity: item.quantity,
          }));

          // If there is a guest cart, merge it onto the server
          const guestCart = localStorage.getItem("guestCart");
          if (guestCart) {
            const guestItems = JSON.parse(guestCart);
            localStorage.removeItem("guestCart");
            
            for (const guestItem of guestItems) {
              const match = mappedItems.find(i => i.id === guestItem.id);
              if (match) {
                const newQty = match.quantity + guestItem.quantity;
                await cartService.updateCartQuantity(guestItem.id, newQty);
              } else {
                // Call add on server, if guest quantity > 1, update it too
                await cartService.addToCart(guestItem.id);
                if (guestItem.quantity > 1) {
                  await cartService.updateCartQuantity(guestItem.id, guestItem.quantity);
                }
              }
            }
            // Fetch fresh merged cart
            const freshCart = await cartService.getCart();
            const freshItems = freshCart.items || [];
            setCart(freshItems.map((item) => ({
              id: item.product?._id || item.product?.id,
              _id: item.product?._id || item.product?.id,
              name: item.product?.name,
              price: item.product?.price,
              image: item.product?.image,
              category: item.product?.category,
              quantity: item.quantity,
            })));
          } else {
            setCart(mappedItems);
          }
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Logout or no user - load guest cart from localStorage
        const savedCart = localStorage.getItem("guestCart");
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    };

    syncCart();
  }, [user]);

  // Persist guest cart to local storage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (item) => {
    const itemId = item._id || item.id;
    if (user) {
      try {
        const existingItem = cart.find(i => i.id === itemId);
        if (existingItem) {
          await cartService.updateCartQuantity(itemId, existingItem.quantity + 1);
        } else {
          await cartService.addToCart(itemId);
        }
        // Refresh cart
        const freshCart = await cartService.getCart();
        setCart((freshCart.items || []).map((i) => ({
          id: i.product?._id || i.product?.id,
          _id: i.product?._id || i.product?.id,
          name: i.product?.name,
          price: i.product?.price,
          image: i.product?.image,
          category: i.product?.category,
          quantity: i.quantity,
        })));
      } catch (error) {
        toast.error("Failed to add item to cart on server");
      }
    } else {
      // Guest local state
      const existingItem = cart.find((i) => i.id === itemId);
      if (existingItem) {
        setCart(
          cart.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
      } else {
        setCart([...cart, { ...item, id: itemId, _id: itemId, quantity: 1 }]);
      }
    }
  };

  const addToCartWithQuantity = async (item, qty) => {
    const itemId = item._id || item.id;
    if (user) {
      try {
        const existingItem = cart.find(i => i.id === itemId);
        if (existingItem) {
          await cartService.updateCartQuantity(itemId, existingItem.quantity + qty);
        } else {
          await cartService.addToCart(itemId);
          if (qty > 1) {
            await cartService.updateCartQuantity(itemId, qty);
          }
        }
        // Refresh cart
        const freshCart = await cartService.getCart();
        setCart((freshCart.items || []).map((i) => ({
          id: i.product?._id || i.product?.id,
          _id: i.product?._id || i.product?.id,
          name: i.product?.name,
          price: i.product?.price,
          image: i.product?.image,
          category: i.product?.category,
          quantity: i.quantity,
        })));
      } catch (error) {
        toast.error("Failed to add item to cart on server");
      }
    } else {
      // Guest local state
      const existingItem = cart.find((i) => i.id === itemId);
      if (existingItem) {
        setCart(
          cart.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + qty } : i
          )
        );
      } else {
        setCart([...cart, { ...item, id: itemId, _id: itemId, quantity: qty }]);
      }
    }
  };

  const increaseQuantity = async (id) => {
    if (user) {
      try {
        const existingItem = cart.find(i => i.id === id);
        if (existingItem) {
          await cartService.updateCartQuantity(id, existingItem.quantity + 1);
          setCart(
            cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
          );
        }
      } catch (error) {
        toast.error("Failed to update cart quantity");
      }
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const decreaseQuantity = async (id) => {
    const existingItem = cart.find(i => i.id === id);
    if (!existingItem) return;

    if (existingItem.quantity <= 1) {
      await removeFromCart(id);
      return;
    }

    if (user) {
      try {
        await cartService.updateCartQuantity(id, existingItem.quantity - 1);
        setCart(
          cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      } catch (error) {
        toast.error("Failed to update cart quantity");
      }
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const removeFromCart = async (id) => {
    if (user) {
      try {
        await cartService.removeFromCart(id);
        setCart(cart.filter((item) => item.id !== id));
        toast.success("Item removed from cart");
      } catch (error) {
        toast.error("Failed to remove item from cart");
      }
    } else {
      setCart(cart.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    }
  };

  const clearLocalCart = () => {
    setCart([]);
    if (!user) {
      localStorage.removeItem("guestCart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        addToCartWithQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}