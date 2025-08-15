import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Truck,
  Star,
  Users,
  Package,
} from "lucide-react";
// ** Assets
import perrlineBanner from "../../../assets/perrline-banner.png";
import dealsBanner from "../../../assets/deals-banner.png";
import premiumBanner from "../../../assets/premium-banner.png";
import deliveryBanner from "../../../assets/delivery-banner.png";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  icon: React.ReactNode;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Premium Wholesale Products",
    description:
      "Discover thousands of high-quality products from trusted brands. Get the best wholesale prices for your business.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    backgroundImage: `url('${premiumBanner}')`,
    icon: <ShoppingBag size={48} />,
  },
  {
    id: 2,
    title: "Fast & Free UK Delivery",
    description:
      "Enjoy free delivery across the UK on orders over £600. Fast, reliable shipping to get your products when you need them.",
    buttonText: "Learn More",
    buttonLink: "/delivery",
    backgroundImage: `url('${deliveryBanner}')`,
    icon: <Truck size={48} />,
  },
  // {
  //   id: 3,
  //   title: "Top Rated by Customers",
  //   description:
  //     "Join thousands of satisfied customers who trust us for their wholesale needs. 5-star rated service and support.",
  //   buttonText: "Read Reviews",
  //   buttonLink: "/reviews",
  //   backgroundImage:
  //     "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3b')",
  //   icon: <Star size={48} />,
  // },
  {
    id: 4,
    title: "Perrline",
    description:
      "Your trusted partner in cleaning and home care products. From effective powder to wet wipes, we deliver quality that lasts.",
    buttonText: "Explore Perrline products now",
    buttonLink: "/community",
    backgroundImage: `url('${perrlineBanner}')`,
    icon: <Users size={48} />,
  },
  {
    id: 5,
    title: "Bulk Orders & Special Deals",
    description:
      "Get exclusive discounts on bulk orders. Special pricing for large quantities and regular customers.",
    buttonText: "Get Quote",
    buttonLink: "/bulk-orders",
    backgroundImage: `url('${dealsBanner}')`,
    icon: <Package size={48} />,
  },
];

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative h-[68vh] overflow-hidden">
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                      {slide.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto opacity-95 drop-shadow-md">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
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
          />
        ))}
      </div>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex space-x-1">
            <div className="w-1 h-4 bg-white"></div>
            <div className="w-1 h-4 bg-white"></div>
          </div>
        ) : (
          <div className="w-4 h-4 relative">
            <div className="absolute inset-0 border-l-4 border-l-white border-y-2 border-y-transparent border-r-0"></div>
          </div>
        )}
      </button>
    </section>
  );
}
