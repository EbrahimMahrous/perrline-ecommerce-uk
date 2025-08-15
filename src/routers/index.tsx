import { Route, Routes } from "react-router-dom";
// ** Components
import LandingPageLayout from "../layouts/LandingPageLayout";
import LandingPage from "../pages/landing/LandingPage";
import CustomerLogin from "../pages/auth/CustomerLogin";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import QuotePage from "../pages/QuotePage";
import AllProducts from "../pages/AllProducts";
import AllBrands from "../pages/AllBrands";
import PriceList from "../pages/PriceList";
import FAQS from "../pages/FAQS";
import CreateAccount from "../pages/auth/CreateAccount";

export default function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="login" element={<CustomerLogin />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-brands" element={<AllBrands />} />
        <Route path="price-list" element={<PriceList />} />
        <Route path="faqs" element={<FAQS />} />
      </Routes>
    </>
  );
}
