import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
  mobileNumber: string;
  companyName: string;
  companyWebsite?: string;
  phoneNumber?: string;
  vatNumber: string;
  streetAddress: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}
interface Country {
  id: string;
  name: string;
  code: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  countries: Country[];
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: User) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    token: string,
    newPassword: string
  ) => Promise<boolean>;
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  resendOtp: (email: string) => Promise<boolean>;
  updateUser: (userData: User) => void;
  deleteAccount: () => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  fetchUserProfile: () => Promise<User | null>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const staticCountries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ].map((country, index) => ({
    id: (index + 1).toString(),
    name: country,
    code: country.substring(0, 3).toUpperCase(),
  }));

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (
        token &&
        userData &&
        userData !== "undefined" &&
        userData !== "null"
      ) {
        try {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
          setToken(token);
        } catch (error) {
          console.error("Error parsing user data from localStorage", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
      setCountries(staticCountries);
      setLoading(false);
    };

    initAuth();
  }, []);
  const clearError = () => setError(null);
  const fetchUserProfile = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token available to fetch user profile");
        return null;
      }
      console.log("Fetching user profile with token");
      const response = await fetch(`${API_URL}/Auth/profile`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("User profile fetched:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        return userData;
      } else {
        console.error("Failed to fetch user profile:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const extractAuthData = async (
    data: any
  ): Promise<{ token: string | null; user: User | null }> => {
    console.log("Extracting auth data from:", data);
    let token = data.token || data.accessToken || data.jwtToken || null;
    if (data.data && data.data.token) {
      token = data.data.token;
    }
    let user = data.user || data.userData || data.account || null;
    if (data.data && data.data.user) {
      user = data.data.user;
    }
    if (token && !user) {
      console.log("Token found but no user data, fetching user profile");
      localStorage.setItem("token", token);
      setToken(token);
      user = await fetchUserProfile();
    }
    return { token, user };
  };
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      clearError();

      console.log("Logging in with:", { email, password: "***" });

      const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      console.log("Login response status:", response.status);
      console.log("Login response text:", responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log("Parsed login data:", data);

          const { token: extractedToken, user: extractedUser } =
            await extractAuthData(data);
          if (extractedToken) {
            localStorage.setItem("token", extractedToken);
            setToken(extractedToken);

            if (extractedUser) {
              localStorage.setItem("user", JSON.stringify(extractedUser));
              setUser(extractedUser);
            }

            setIsAuthenticated(true);

            console.log("Login successful");
            return true;
          } else {
            console.warn("Missing token in response:", data);

            if (data.message) {
              setError(data.message);
            } else {
              setError("Invalid response from server: missing token");
            }
            return false;
          }
        } catch (jsonError) {
          console.error("JSON parsing error:", jsonError);
          setError("Invalid response from server");
          return false;
        }
      } else {
        let errorMessage = "Login failed";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (response.status === 400 && errorData.errors) {
            errorMessage = Object.values(errorData.errors).flat().join(", ");
          }
        } catch (e) {
          errorMessage =
            responseText || `${response.status}: ${response.statusText}`;
        }
        setError(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: User): Promise<boolean> => {
    try {
      setLoading(true);
      clearError();
      const requestBody = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        mobileNumber: userData.mobileNumber,
        phoneNumber: userData.phoneNumber,
        companyName: userData.companyName,
        companyWebsite: userData.companyWebsite,
        vatNumber: userData.vatNumber,
        streetAddress: userData.streetAddress,
        city: userData.city,
        country: userData.country,
        state: userData.state,
        zipCode: userData.zipCode,
      };

      console.log("Sending registration request:", requestBody);

      const response = await fetch(`${API_URL}/Auth/register`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Registration response status:", response.status);
      const responseText = await response.text();
      console.log("Registration response text:", responseText);

      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log("Parsed registration data:", data);

          const { token: extractedToken, user: extractedUser } =
            await extractAuthData(data);
          if (extractedToken) {
            localStorage.setItem("token", extractedToken);
            setToken(extractedToken);

            if (extractedUser) {
              localStorage.setItem("user", JSON.stringify(extractedUser));
              setUser(extractedUser);
            }

            setIsAuthenticated(true);

            console.log("Registration successful");
            return true;
          } else {
            console.warn("Missing token in response:", data);
            if (data.message && data.success) {
              console.log("Trying auto login after registration");
              const loginSuccess = await login(
                userData.email,
                userData.password
              );
              if (loginSuccess) {
                return true;
              } else {
                setError(
                  "Registration successful but automatic login failed. Please login manually."
                );
                return false;
              }
            } else {
              setError(
                data.message || "Invalid response from server: missing token"
              );
              return false;
            }
          }
        } catch (jsonError) {
          console.log("Server returned text response:", responseText);
          const loginSuccess = await login(userData.email, userData.password);
          if (loginSuccess) {
            return true;
          } else {
            setError(
              "Registration successful but automatic login failed. Please login manually."
            );
            return false;
          }
        }
      } else {
        let errorMessage = "Registration failed";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (response.status === 400 && errorData.errors) {
            errorMessage = Object.values(errorData.errors).flat().join(", ");
          }
        } catch {
          errorMessage =
            responseText || `${response.status}: ${response.statusText}`;
        }
        setError(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Registration network error:", error);
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      clearError();

      const url = `${API_URL}/Auth/forgot-password`;
      console.log("Sending forgot password request to:", url);
      console.log("With email:", email);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        return true;
      } else {
        setError(responseText || "Password reset request failed");
        return false;
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      clearError();

      const response = await fetch(`${API_URL}/Auth/reset-password`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          newPassword,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        setError(errorText || "Password reset failed");
        return false;
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/Auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        return true;
      } else {
        console.error("Failed to delete account:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Delete account error:", error);
      return false;
    }
  };
  const verifyOtp = async (email: string, code: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/Auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ email, code }),
      });
      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "OTP verification failed");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/Auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to resend OTP");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const updateUser = (userData: User): void => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };
  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    countries,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyOtp,
    resendOtp,
    updateUser,
    deleteAccount,
    loading,
    error,
    clearError,
    fetchUserProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
