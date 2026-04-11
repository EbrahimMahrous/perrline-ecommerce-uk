import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/TranslationContext";

const YourAccount: React.FC = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [activeItem, setActiveItem] = useState("YOUR ACCOUNT");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setActiveItem(t("account.yourAccount"));
  }, [t]);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      const success = await deleteAccount();
      if (success) {
        setShowDeleteModal(false);
        navigate("/");
        console.log("Deleted Account Success");
      } else {
        setDeleteError(t("account.deleteError"));
      }
    } catch (error) {
      setDeleteError(t("account.deleteErrorGeneral"));
      console.error("Delete account error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMenuItemClick = (itemId: string, itemLabel: string) => {
    setActiveItem(itemLabel);
    if (itemId === "delete") setShowDeleteModal(true);
    if (itemId === "logout") setShowLogoutModal(true);
  };

  const menuItems = [
    { id: "account", label: t("account.yourAccount") },
    { id: "delete", label: t("account.deleteAccount") },
    { id: "logout", label: t("account.logout") },
  ];

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Bar */}
          <div className="lg:col-span-1 bg-bg-secondary rounded-lg p-6 shadow-sm border-light border relative">
            <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary-dark opacity-0 lg:opacity-100"></div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`block w-full text-left py-3 px-4 rounded-md transition-all duration-200 ${
                    activeItem === item.label
                      ? "bg-primary text-white shadow-md"
                      : "text-[var(--color-primary)] hover:bg-accent-2 hover:text-[var(--color-primary)]"
                  }`}
                  onClick={() => handleMenuItemClick(item.id, item.label)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-4 border-t border-light">
              <h3 className="text-sm font-medium text-[var(--color-primary)] mb-2">
                {t("account.contactUs")}
              </h3>
              <p className="text-sm text-secondary mb-2">
                {t("account.onlineCustomerService")}
              </p>
              <p className="text-sm text-secondary">
                {t("account.emailAddress")}: mohamedmansi@pearline.co.uk
              </p>
              <p className="text-sm text-secondary">
                {t("account.contactNumber")}: +447443715994
              </p>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3 bg-bg-primary rounded-lg p-6 shadow-sm border-light border">
            <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
              {t("account.myAccount")}
            </h1>

            <div className="mb-8">
              <div className="mb-6">
                <p className="text-secondary">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-secondary">{user?.email}</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => navigate("/edit-account")}
              >
                {t("account.edit")}
              </button>
              <button
                className="px-4 py-2 bg-bg-secondary text-[var(--color-primary)] rounded-md border border-light hover:bg-bg-primary transition-colors"
                onClick={() => navigate("/edit-account")}
              >
                {t("account.changePassword")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
              {t("account.confirmDeletion")}
            </h3>
            <p className="text-secondary mb-6">
              {t("account.deleteConfirmationMessage")}
            </p>

            {deleteError && (
              <p className="text-red-500 text-sm mb-4">{deleteError}</p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-bg-secondary text-[var(--color-primary)] rounded-md border border-light hover:bg-bg-primary transition-colors"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                {t("account.cancel")}
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span>{t("account.deleting")}</span>
                  </>
                ) : (
                  t("account.deleteAccountButton")
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">
              {t("account.confirmLogout")}
            </h3>
            <p className="text-secondary mb-6">
              {t("account.logoutConfirmationMessage")}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-bg-secondary text-[var(--color-primary)] rounded-md border border-light hover:bg-bg-primary transition-colors"
                onClick={() => setShowLogoutModal(false)}
              >
                {t("account.cancel")}
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                onClick={handleLogout}
              >
                {t("account.logoutButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourAccount;
