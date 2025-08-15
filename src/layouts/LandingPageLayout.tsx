import { Outlet } from "react-router-dom";
// ** components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
