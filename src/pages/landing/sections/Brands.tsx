import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: number;
  name: string;
  logo: string;
  color: string;
  bgColor: string;
}

const brands: Brand[] = [
  { id: 1, name: "Andrex", logo: "ANDREX", color: "#2563eb", bgColor: "#dbeafe" },
  { id: 2, name: "Gillette", logo: "GILLETTE", color: "#1d4ed8", bgColor: "#dbeafe" },
  { id: 3, name: "Dove", logo: "DOVE", color: "#7c3aed", bgColor: "#ede9fe" },
  { id: 4, name: "Dettol", logo: "DETTOL", color: "#059669", bgColor: "#d1fae5" },
  { id: 5, name: "Batiste", logo: "BATISTE", color: "#0891b2", bgColor: "#cffafe" },
  { id: 6, name: "Fairy", logo: "FAIRY", color: "#dc2626", bgColor: "#fee2e2" },
  { id: 7, name: "Listerine", logo: "LISTERINE", color: "#1f2937", bgColor: "#f3f4f6" },
  { id: 8, name: "Lenor", logo: "LENOR", color: "#2563eb", bgColor: "#dbeafe" },
  { id: 9, name: "Huggies", logo: "HUGGIES", color: "#ea580c", bgColor: "#fed7aa" },
];

export default function Brands() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const brandsPerView = 5;
  const maxIndex = Math.max(0, brands.length - brandsPerView);
  const navigate = useNavigate();

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const visibleBrands = brands.slice(currentIndex, currentIndex + brandsPerView);

  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--primary-gold)] mb-4">
            Global Brands At Global Prices
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Explore a vast selection of world-renowned brands at unbeatable prices.
          </p>
        </div>

        {/* Brands Carousel */}
        <div className="relative mb-12">
          <div className="flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 bg-[var(--accent-cream)] hover:bg-[var(--primary-gold-light)] text-[var(--primary-gold-dark)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Brands Container */}
            <div className="flex space-x-6 overflow-hidden px-16">
              {visibleBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  <div
                    className="w-full h-full rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    <span className="text-2xl font-bold" style={{ color: brand.color }}>
                      {brand.logo}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 bg-[var(--accent-cream)] hover:bg-[var(--primary-gold-light)] text-[var(--primary-gold-dark)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[var(--primary-gold)] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Brands Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/all-brands")}
            className="inline-flex items-center space-x-2 text-[var(--primary-gold-dark)] hover:text-[var(--primary-gold)] font-semibold text-lg transition-colors duration-300 group"
          >
            <span>Shop Brands</span>
            <ArrowRight
              size={20}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
