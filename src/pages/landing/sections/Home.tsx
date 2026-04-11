import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import logo from "../../../assets/p-white.png";
import trustedPartnerBanner from "../../../assets/banner1.jpg";
// import lorealBanner from "../../../assets/banner2.jpg";
// import globalPartnerBanner from "../../../assets/banner3.jpg";
import premiumBrandsBanner from "../../../assets/banner4.jpg";
import { useTranslation } from "../../../i18n/TranslationContext";
import { Link } from "react-router-dom";

interface CarouselSlide {
  id: number;
  title: string;
  subTitle?: string;
  subSubTitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  icon: React.ReactNode;
}

export default function HomeCarousel() {
  const { t, isRTL } = useTranslation();
  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: t("carousel.trustedPartner.title"),
      description: t("carousel.trustedPartner.description"),
      buttonText: t("carousel.trustedPartner.buttonText"),
      buttonLink: "/all-products",
      backgroundImage: `url('${trustedPartnerBanner}')`,
      icon: <img src={logo} alt="Logo" className="w-24 h-24" />,
    },
    // {
    //   id: 2,
    //   title: t("carousel.loreal.title"),
    //   subTitle: t("carousel.loreal.subTitle"),
    //   subSubTitle: t("carousel.loreal.subSubTitle"),
    //   description: t("carousel.loreal.description"),
    //   buttonText: t("carousel.loreal.buttonText"),
    //   buttonLink: "/all-products",
    //   backgroundImage: `url('${lorealBanner}')`,
    //   icon: "",
    // },
    // {
    //   id: 3,
    //   title: t("carousel.globalPartner.title"),
    //   description: t("carousel.globalPartner.description"),
    //   buttonText: t("carousel.globalPartner.buttonText"),
    //   buttonLink: "/",
    //   backgroundImage: `url('${globalPartnerBanner}')`,
    //   icon: <img src={logo} alt="Logo" className="w-24 h-24" />,
    // },
    {
      id: 4,
      title: t("carousel.premiumBrands.title"),
      description: t("carousel.premiumBrands.description"),
      buttonText: t("carousel.premiumBrands.buttonText"),
      buttonLink: "/all-products",
      backgroundImage: `url('${premiumBrandsBanner}')`,
      icon: "",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section
      className="relative h-[68vh] overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `${slide.backgroundImage}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 h-full flex items-center justify-center">
              <div
                className={`container mx-auto px-4 text-white ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div className="max-w-4xl">
                  {/* Icon */}
                  <div
                    className={`mb-2 flex ${
                      isRTL ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="rounded-lg">{slide.icon}</div>
                  </div>
                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-xl">
                    {slide.title}
                  </h1>
                  {/* subTitle */}
                  {slide.subTitle && (
                    <h2 className="text-4xl md:text-6xl font-bold mb-3 leading-snug text-[rgb(69,28,22)] drop-shadow-md">
                      {slide.subTitle}
                    </h2>
                  )}
                  {/* subSubTitle */}
                  {slide.subSubTitle && (
                    <p className="mb:8 text-lg md:text-2xl font-bold leading-relaxed text-[rgba(69,28,22,0.83)] drop-shadow-sm">
                      {slide.subSubTitle}
                    </p>
                  )}
                  {/* Description - Conditionally rendered */}
                  {slide.description && (
                    <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl opacity-95 drop-shadow-md">
                      {slide.description}
                    </p>
                  )}
                  {/* Button */}
                  <Link
                    to={slide.buttonLink}
                    className={`group inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span>{slide.buttonText}</span>
                    <ArrowRight
                      size={20}
                      className={`transition-transform duration-300 ${
                        isRTL ? "rotate-180" : ""
                      } ${
                        isRTL
                          ? "group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-[var(--color-primary)] p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          isRTL ? "right-4" : "left-4"
        }`}
        aria-label={isRTL ? "Next slide" : "Previous slide"}
      >
        <ChevronLeft size={24} className={isRTL ? "rotate-180" : ""} />
      </button>
      <button
        onClick={isRTL ? prevSlide : nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className={`absolute top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-[var(--color-primary)] p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          isRTL ? "left-4" : "right-4"
        }`}
        aria-label={isRTL ? "Previous slide" : "Next slide"}
      >
        <ChevronRight size={24} className={isRTL ? "rotate-180" : ""} />
      </button>
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
