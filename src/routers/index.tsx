import { Route, Routes } from "react-router-dom";
import LandingPageLayout from "../layouts/LandingPageLayout";
import LandingPage from "../pages/landing/LandingPage";
import CustomerLogin from "../pages/auth/CustomerLogin";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import QuotePage from "../pages/QuotePage";
import AllProducts from "../pages/AllProducts";
import AllBrands from "../pages/AllBrands";
import FAQS from "../pages/FAQS";
import CreateAccount from "../pages/auth/CreateAccount";
import ProductDetail from "../pages/ProductDetail";
import ForgotPassword from "../pages/auth/ForgetPassword";
import YourAccount from "../pages/auth/YourAccount";
import EditAccountPage from "../pages/auth/EditAccountPage";
import ResetPassword from "../pages/auth/ResetPassword";
import PrivacyPolicy from "../pages/ourPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/ourPolicy/TermsAndConditions";
import BrandProducts from "../pages/BrandProducts";
import OTPVerification from "../pages/auth/OTPVerification";
export default function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-brands" element={<AllBrands />} />
        <Route path="/faqs" element={<FAQS />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/my-account" element={<YourAccount />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/brand/:brandName" element={<BrandProducts />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
      </Routes>
    </>
  );
}
