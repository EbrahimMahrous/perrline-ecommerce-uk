import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { getImageUrl } from "../utils/imageUrl";
import { useTranslation } from "../i18n/TranslationContext";

const QuotePage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    fetchCart,
    submitQuote,
    error: cartError,
    isLoading: cartLoading,
  } = useCart();

  const { isAuthenticated, logout, token, user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (token && token !== "undefined" && token !== "null") {
      fetchCart();
    } else {
      setMessage(t("quotePage.authFailure"));
      logout();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (cartError && cartError.includes("Authentication")) {
      setMessage(cartError);
    }
  }, [cartError]);

  const handleNoteChange = (barcode: string, note: string) => {
    setNotes((prev) => ({ ...prev, [barcode]: note }));
  };

  const handleSubmitQuote = async () => {
    if (!isAuthenticated) {
      setMessage(t("quotePage.loginPrompt"));
      navigate("/login");
      return;
    }

    if (!email) {
      setMessage(t("quotePage.emailRequired"));
      return;
    }

    if (getTotalPrice() < 5000) {
      setMessage(
        `${t("quotePage.minimumTotalError")}${getTotalPrice().toFixed(2)}`
      );
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const success = await submitQuote(email, comments);
      if (success) {
        setMessage(t("quotePage.successMessage"));
        setEmail("");
        setComments("");
        setNotes({});

        setTimeout(() => {
          navigate("/all-products");
        }, 2000);
      } else {
        setMessage(t("quotePage.failureMessage"));
      }
    } catch (error) {
      setMessage(t("quotePage.failureMessage"));
      console.error("Quote submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="h-auto flex flex-col items-center justify-center bg-bg-secondary p-16">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
            {t("quotePage.title")}
          </h1>
          <Link
            to="/login"
            className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            {t("navbar.registerLogin")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (cartLoading) {
    return (
      <>
        <Navbar />
        <div className="h-auto flex flex-col items-center justify-center bg-bg-secondary p-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-muted">{t("quotePage.loading")}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="h-auto flex flex-col items-center justify-center bg-bg-secondary p-16">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
            {t("quotePage.title")}
          </h1>
          <p className="text-muted mb-6">{t("quotePage.emptyMessage")}</p>
          <Link
            to="/all-products"
            className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            {t("quotePage.continueShopping")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = getTotalPrice();
  const tax = 0;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <div className="container-custom py-10">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-8">
          {t("quotePage.title")}
        </h1>

        {(message || cartError) && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : cartError?.includes("Authentication")
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message || cartError}
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-semibold text-[var(--color-primary)]">
                  {t("quotePage.tableHeaders.item")}
                </th>
                <th className="p-4 text-left font-semibold text-[var(--color-primary)]">
                  {t("quotePage.tableHeaders.addNote")}
                </th>
                <th className="p-4 text-left font-semibold text-[var(--color-primary)]">
                  {t("quotePage.tableHeaders.cases")}
                </th>
                <th className="p-4 text-right font-semibold text-[var(--color-primary)]">
                  {t("quotePage.tableHeaders.subtotal")}
                </th>
                <th className="p-4 text-center font-semibold text-[var(--color-primary)]">
                  {t("quotePage.tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {/* Item */}
                  <td className="p-4 align-top">
                    <div className="flex items-start gap-4">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.png";
                        }}
                      />
                      <div className="flex-1">
                        <h2 className="font-semibold text-[var(--color-primary)] mb-2">
                          {item.name}
                        </h2>
                        <p className="text-muted text-sm mb-1">
                          {t("quotePage.itemDetails.barcode")}: {item.barcode}
                        </p>
                        <p className="text-muted text-sm mb-1">
                          {t("quotePage.itemDetails.unitsPerCase")}:{" "}
                          {item.caseSize}
                        </p>
                        <p className="text-muted text-sm mb-1">
                          {t("quotePage.itemDetails.casesPerLayer")}:{" "}
                          {item.casesPerLayer}
                        </p>
                        <p className="text-muted text-sm mb-1">
                          {t("quotePage.itemDetails.casesPerPallet")}:{" "}
                          {item.casesPerPallet}
                        </p>
                        <p className="text-muted text-sm">
                          {t("quotePage.itemDetails.leadTime")}:{" "}
                          {item.leadTimeDays} {t("quotePage.itemDetails.days")}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-2">
                          £{item.unitPrice.toFixed(2)}{" "}
                          {t("quotePage.itemDetails.perUnit")}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Add Note */}
                  <td className="p-4 align-top">
                    <textarea
                      value={notes[item.barcode] || ""}
                      onChange={(e) =>
                        handleNoteChange(item.barcode, e.target.value)
                      }
                      placeholder={t("quotePage.notePlaceholder")}
                      className="w-full px-3 py-2 border border-light rounded-md focus:outline-none focus:border-primary resize-none"
                      rows={3}
                    />
                  </td>
                  {/* Cases */}
                  <td className="p-4 align-top">
                    <div className="flex items-center justify-center">
                      <button
                        className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={() =>
                          updateQuantity(
                            item.barcode,
                            Math.max(0, item.quantity - 1),
                            true
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.barcode,
                            Math.max(0, Number(e.target.value)),
                            true
                          )
                        }
                        className="w-16 h-8 border-t border-b border-light text-center"
                        min="0"
                      />
                      <button
                        className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center hover:bg-gray-300 transition-colors"
                        onClick={() =>
                          updateQuantity(item.barcode, item.quantity + 1, true)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-center text-sm text-muted mt-2">
                      {item.quantity} {t("quotePage.tableHeaders.cases")}
                    </p>
                  </td>
                  {/* Subtotal */}
                  <td className="p-4 text-right align-top font-semibold text-[var(--color-primary)]">
                    £{(item.unitPrice * item.quantity).toFixed(2)}
                  </td>
                  {/* Remove Button */}
                  <td className="p-4 text-center align-top">
                    <button
                      className="text-red-500 hover:text-red-700 text-sm p-2 rounded-full hover:bg-red-50 transition-colors"
                      onClick={() => removeFromCart(item.barcode, true)}
                      title={t("quotePage.removeItem")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Form + Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Form */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              {t("quotePage.yourDetails")}
            </h3>
            <div className="mb-4">
              <label className="block text-muted mb-2">
                {t("quotePage.emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-light rounded-md focus:outline-none focus:border-primary"
                placeholder={t("quotePage.emailPlaceholder")}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-muted mb-2">
                {t("quotePage.commentsLabel")}
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-2 border border-light rounded-md focus:outline-none focus:border-primary"
                rows={4}
                placeholder={t("quotePage.commentsPlaceholder")}
              />
            </div>
            <button
              onClick={handleSubmitQuote}
              disabled={isSubmitting || cartLoading}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 w-full disabled:opacity-50"
            >
              {isSubmitting
                ? t("quotePage.submitButton") + "..."
                : t("quotePage.submitButton")}
            </button>
            <p className="text-muted text-sm mt-4 text-center">
              {t("quotePage.minQuoteTotal")}
            </p>
          </div>
          {/* Quote Summary */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              {t("quotePage.quoteSummary")}
            </h3>
            <div className="flex justify-between mb-2">
              <span>{t("quotePage.quoteSubtotal")}</span>
              <span className="font-semibold">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t("quotePage.tax")}</span>
              <span>£{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>{t("quotePage.quoteTotal")}</span>
              <span className="text-primary">£{total.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                to="/all-products"
                className="block text-center bg-accent-4 hover:bg-accent-4-dark text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
              >
                {t("quotePage.continueShoppingButton")}
              </Link>
              <button
                onClick={() => {
                  if (confirm(t("quotePage.clearQuoteConfirmation"))) {
                    window.location.reload();
                  }
                }}
                className="block text-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition duration-200"
              >
                {t("quotePage.clearQuoteButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuotePage;
