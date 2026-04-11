import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
const API_URL = import.meta.env.VITE_API_URL;
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactError {
  message: string;
}

interface ContactContextType {
  loading: boolean;
  error: ContactError | null;
  sendMessage: (
    data: ContactFormData
  ) => Promise<{ success: boolean; error?: string }>;
  getAllMessages: () => Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);
interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ContactError | null>(null);

  const sendMessage = async (messageData: ContactFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/Contact/send`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send message: ${response.status} ${response.statusText}`
        );
      }

      setLoading(false);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError({ message: errorMessage });
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const getAllMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/Contact/all`, {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch messages: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError({ message: errorMessage });
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const value: ContactContextType = {
    loading,
    error,
    sendMessage,
    getAllMessages,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export const useContact = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};
