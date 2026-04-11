import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../../i18n/TranslationContext";

// ** Assets
import armhammer from "../../../assets/AllBrands/armhammer.jpg";
import aveeno from "../../../assets/AllBrands/aveeno.jpg";
import axe from "../../../assets/AllBrands/axe.jpg";
import cetaphil from "../../../assets/AllBrands/cetaphil.jpg";
import dettol from "../../../assets/AllBrands/dettol.jpg";
import dove from "../../../assets/AllBrands/dove.jpg";
import eucerin from "../../../assets/AllBrands/eucerin.jpg";
import garnier from "../../../assets/AllBrands/garnier.jpg";
import gillette from "../../../assets/AllBrands/gillette.jpg";
import headshoulders from "../../../assets/AllBrands/headshoulders.jpg";
import herbalessences from "../../../assets/AllBrands/herbalessences.jpg";

interface Brand {
  id: number;
  name: string;
  logo: string;
  image: string;
  color: string;
  bgColor: string;
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Arm & Hammer",
    logo: "ARM & HAMMER",
    image: armhammer,
    color: "var(--color-primary)",
    bgColor: "",
  },
  {
    id: 2,
    name: "Aveeno",
    logo: "AVEENO",
    image: aveeno,
    color: "var(--color-primary-dark)",
    bgColor: "",
  },
  {
    id: 3,
    name: "Axe",
    logo: "AXE",
    image: axe,
    color: "var(--color-accent-4)",
    bgColor: "",
  },
  {
    id: 4,
    name: "Cetaphil",
    logo: "CETAPHIL",
    image: cetaphil,
    color: "var(--color-primary)",
    bgColor: "",
  },
  {
    id: 5,
    name: "Dettol",
    logo: "DETTOL",
    image: dettol,
    color: "var(--color-accent-4)",
    bgColor: "",
  },
  {
    id: 7,
    name: "Dove",
    logo: "DOVE",
    image: dove,
    color: "text-[var(--color-primary)]",
    bgColor: "",
  },
  {
    id: 8,
    name: "Eucerin",
    logo: "EUCERIN",
    image: eucerin,
    color: "var(--color-accent-4)",
    bgColor: "",
  },
  {
    id: 9,
    name: "Garnier",
    logo: "GARNIER",
    image: garnier,
    color: "var(--color-primary-dark)",
    bgColor: "",
  },
  {
    id: 10,
    name: "Gillette",
    logo: "GILLETTE",
    image: gillette,
    color: "var(--color-primary)",
    bgColor: "",
  },
  {
    id: 11,
    name: "Head & Shoulders",
    logo: "HEAD & SHOULDERS",
    image: headshoulders,
    color: "var(--color-accent-4)",
    bgColor: "",
  },
  {
    id: 12,
    name: "Herbal Essences",
    logo: "HERBAL ESSENCES",
    image: herbalessences,
    color: "var(--color-primary-dark)",
    bgColor: "",
  },
];

export default function Brands() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const brandsPerView = 5;
  const maxIndex = Math.max(0, brands.length - brandsPerView);
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 2500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  const visibleBrands = brands.slice(
    currentIndex,
    currentIndex + brandsPerView
  );

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            {t("brands.title")}
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {t("brands.description")}
          </p>
        </div>

        {/* Brands Carousel */}
        <div
          className="relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={isRTL ? nextSlide : prevSlide}
              className="absolute left-0 z-10 bg-accent-2 hover:bg-primary-light text-[var(--color-primary)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Brands Container */}
            <div className="flex space-x-6 overflow-hidden px-16">
              {visibleBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-48 h-32 bg-bg-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-light"
                >
                  <div
                    className="w-full h-full rounded-xl flex items-center justify-center p-4"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Right Arrow */}
            <button
              onClick={isRTL ? prevSlide : nextSlide}
              className="absolute right-0 z-10 bg-accent-2 hover:bg-primary-light text-[var(--color-primary)] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
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
                    ? "bg-primary scale-125"
                    : "bg-gray-200 hover:bg-border-medium"
                }`}
              />
            ))}
          </div>
        </div>
        {/* View All Brands Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/all-brands")}
            className="inline-flex items-center space-x-2 text-accent-4 hover:text-accent-4-dark font-semibold text-lg transition-colors duration-300 group"
          >
            <span>{t("brands.shopButton")}</span>
            <ArrowRight
              size={20}
              className={`transform group-hover:translate-x-1 transition-transform duration-300 ${
                isRTL ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
