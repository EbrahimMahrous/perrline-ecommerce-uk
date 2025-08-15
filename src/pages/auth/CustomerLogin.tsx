import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid md:grid-cols-2">
          {/* Registered Customers */}
          <div>
            <div className="bg-[var(--accent-blue)] text-white font-semibold text-lg px-6 py-3">
              REGISTERED CUSTOMERS
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[var(--text-secondary)]">
                If you have an account, sign in with your email address.
              </p>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-[var(--border-light)] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-[var(--border-light)] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)]"
                />
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showPass"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="showPass"
                    className="text-sm text-[var(--text-secondary)]"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              {/* <div className="border p-3 rounded flex items-center gap-3">
                <input type="checkbox" />
                <span className="text-sm text-[var(--text-secondary)]">
                  I'm not a robot
                </span>
              </div> */}

              <div className="flex items-center gap-4">
                <button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold-dark)] text-white px-6 py-2 rounded shadow-md">
                  LOGIN
                </button>
                <a
                  href="#"
                  className="text-[var(--accent-blue)] text-sm underline"
                >
                  Forgot Your Password?
                </a>
              </div>

              {/* <p className="text-xs text-red-600">* Required Fields</p> */}
            </div>
          </div>

          {/* New Customers */}
          <div className="border-l border-[var(--border-light)]">
            <div className="bg-[var(--accent-blue)] text-white font-semibold text-lg px-6 py-3">
              NEW CUSTOMERS
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[var(--text-secondary)]">
                Creating an account has many benefits: check out faster, keep
                more than one address, track orders and more.
              </p>
              <button
                className="bg-[var(--accent-green)] hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
                onClick={()=> {navigate('/register')}}
              >
                REGISTER FOR PRICING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
