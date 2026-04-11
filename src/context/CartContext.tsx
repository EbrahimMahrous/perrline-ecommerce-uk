import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "../context/AuthContext";

export interface CartItem {
  id: string;
  barcode: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  caseSize: number;
  casesPerLayer: number;
  casesPerPallet: number;
  leadTimeDays: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    barcode: string,
    quantity: number,
    isCase: boolean
  ) => Promise<boolean>;
  updateQuantity: (
    barcode: string,
    quantity: number,
    isCase: boolean
  ) => Promise<boolean>;
  removeFromCart: (barcode: string, isCase: boolean) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  getTotalPrice: () => number;
  fetchCart: () => Promise<void>;
  submitQuote: (email: string, comments: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const getAuthHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      accept: "*/*",
    };
    if (token && token !== "undefined" && token !== "null") {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No valid token available");
      logout();
    }
    return headers;
  };

  const handleUnauthorized = () => {
    setError("Authentication failed. Please log in again.");
    console.error("Authentication failed. Please log in again.");
    setCartItems([]);
    logout();
  };

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token || token === "undefined" || token === "null") {
        handleUnauthorized();
        return;
      }
      const response = await fetch(`${API_URL}/Cart`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart API response:", data);

        let items = [];

        if (data && Array.isArray(data.items)) {
          items = data.items;
        } else if (Array.isArray(data)) {
          items = data;
        } else {
          console.error("API response format unexpected:", data);
          setCartItems([]);
          setError("Invalid cart data format");
          return;
        }
        const validItems = items.map((item: any) => {
          return {
            id: item.id || Math.random().toString(),
            barcode: item.productBarcode || "",
            name: item.productName || "",
            image: item.productImage || "",
            unitPrice: item.pricePerItem || 0,
            quantity: item.quantity || 0,
            caseSize: item.caseSize || 1,
            casesPerLayer: item.casesPerLayer || 0,
            casesPerPallet: item.casesPerPallet || 0,
            leadTimeDays: item.leadTimeDays || 0,
          };
        });
        setCartItems(validItems);
      } else if (response.status === 401) {
        handleUnauthorized();
      } else {
        setError("Failed to fetch cart");
        console.error("Failed to fetch cart");
        setCartItems([]);
      }
    } catch (error) {
      setError("Error fetching cart");
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };
  const addToCart = async (
    barcode: string,
    quantity: number,
    isCase: boolean
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token || token === "undefined" || token === "null") {
        handleUnauthorized();
        return false;
      }

      const response = await fetch(
        `${API_URL}/Cart/add?barcode=${encodeURIComponent(
          barcode
        )}&quantity=${quantity}&isCase=${isCase}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        await fetchCart();
        return true;
      } else if (response.status === 401) {
        handleUnauthorized();
        return false;
      }
      setError("Failed to add item to cart");
      return false;
    } catch (error) {
      setError("Error adding to cart");
      console.error("Error adding to cart:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (
    barcode: string,
    quantity: number,
    isCase: boolean
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const currentItem = cartItems.find((item) => item.barcode === barcode);
      if (!currentItem) {
        setError("Item not found in cart");
        return false;
      }
      if (quantity === currentItem.quantity) {
        return true;
      }
      const quantityDifference = quantity - currentItem.quantity;

      if (quantityDifference > 0) {
        return await addToCart(barcode, quantityDifference, isCase);
      } else {
        const removeSuccess = await removeFromCart(barcode, isCase);
        if (!removeSuccess) return false;

        if (quantity > 0) {
          return await addToCart(barcode, quantity, isCase);
        }
        return true;
      }
    } catch (error) {
      setError("Error updating quantity");
      console.error("Error updating quantity:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (
    barcode: string,
    isCase: boolean
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!token || token === "undefined" || token === "null") {
        handleUnauthorized();
        return false;
      }
      if (!barcode) {
        setError("Invalid barcode");
        console.error("Invalid barcode:", barcode);
        return false;
      }
      console.log("Removing item with barcode:", barcode);
      const url = `${API_URL}/Cart/remove/${encodeURIComponent(
        barcode
      )}?isCase=${isCase}`;
      console.log("DELETE request to:", url);

      const response = await fetch(url, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await fetchCart();
        return true;
      } else if (response.status === 401) {
        handleUnauthorized();
        return false;
      } else if (response.status === 404) {
        setError("Item not found in cart");
        return false;
      }
      setError("Failed to remove item from cart");
      return false;
    } catch (error) {
      setError("Error removing from cart");
      console.error("Error removing from cart:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const clearCart = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token || token === "undefined" || token === "null") {
        handleUnauthorized();
        return false;
      }
      const response = await fetch(`${API_URL}/Cart/clear`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setCartItems([]);
        return true;
      } else if (response.status === 401) {
        handleUnauthorized();
        return false;
      }
      setError("Failed to clear cart");
      return false;
    } catch (error) {
      setError("Error clearing cart");
      console.error("Error clearing cart:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuote = async (
    email: string,
    comments: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token) {
        handleUnauthorized();
        return false;
      }
      if (cartItems.length === 0) {
        setError(
          "Cannot submit an empty quote. Please add items to your cart first."
        );
        return false;
      }
      const response = await fetch(`${API_URL}/Quote/submit`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          comments: comments,
        }),
      });
      console.log("Quote submission response status:", response.status);
      if (response.ok) {
        const result = await response.json();
        console.log("Quote submitted successfully:", result);
        await clearCart();
        return true;
      } else if (response.status === 401) {
        handleUnauthorized();
        return false;
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(
          errorData.message || "Validation error: Please check your input"
        );
        return false;
      } else {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        setError("Server error: Please try again later");
        return false;
      }
    } catch (error) {
      console.error("Network error submitting quote:", error);
      setError("Network error: Please check your connection and try again");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  };
  useEffect(() => {
    if (token && token !== "undefined" && token !== "null") {
      fetchCart();
    }
  }, [token]);
  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    fetchCart,
    submitQuote,
    isLoading,
    error,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
