
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuotePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quote List</h1>
        <p className="text-gray-600 mb-6">You have no items in your quote.</p>
        <Link
          to="/"
          className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold-dark)] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
        >
          Click here to continue shopping
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default QuotePage;
