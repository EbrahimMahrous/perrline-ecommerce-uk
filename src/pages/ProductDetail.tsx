import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/TranslationContext";
import { getImageUrl } from "../utils/imageUrl";
import caseImg from "../assets/caseImg.png";
import layerImg from "../assets/layerImg.png";
import palletImg from "../assets/palletImg.png";

type APIProduct = {
  barcode: string;
  productName: string;
  brand: string;
  productImage: string;
  caseSize: number;
  casesPerLayer: number;
  casesPerPallet: number;
  leadTimeDays: number;
  casePrice: number;
  unitPrice: number;
  isAvailable: boolean;
  description: string;
  ingredients: string;
  usage: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
};

// Message Component
const Message = memo(
  ({ type, text }: { type: "success" | "error"; text: string }) => (
    <div
      className={`p-3 rounded-md mb-4 ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {text}
    </div>
  )
);

const QuantityButton = memo(
  ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    label,
  }: {
    type: "case" | "layer" | "pallet";
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    label: string;
  }) => (
    <button
      className="px-4 py-3 bg-gray-100 rounded-lg flex items-center justify-center flex-1 hover:bg-gray-200 transition-colors"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="font-medium">+ {label}</span>
    </button>
  )
);

// Accordion component details
const DetailAccordion = memo(
  ({
    title,
    content,
    isOpen,
    onToggle,
  }: {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div className="border border-light rounded-md mb-4">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-bg-secondary transition-colors"
        onClick={onToggle}
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-light bg-bg-secondary">
          <p>{content || `No ${title.toLowerCase()} available.`}</p>
        </div>
      )}
    </div>
  )
);

// Component to display related product
const RelatedProductCard = memo(
  ({
    product,
    isAuthenticated,
  }: {
    product: APIProduct;
    isAuthenticated: boolean;
  }) => (
    <div className="w-1/4 flex-shrink-0 px-3">
      <div className="border-light border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-bg-primary h-full">
        <div className="p-4 h-full flex flex-col">
          <img
            src={getImageUrl(product.productImage)}
            alt={product.productName}
            className="w-full h-48 object-contain mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300/E6F4F3/1A2A29?text=Product+Image";
            }}
            loading="lazy"
          />

          <h3 className="font-semibold text-lg mb-2 text-[var(--color-primary)] text-left flex-grow">
            {product.productName}
          </h3>

          <p className="text-sm text-muted mb-2 text-left">
            {useTranslation().t("productDetail.barcode")}: {product.barcode}
          </p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[var(--color-primary)]">
              {useTranslation().t("productDetail.caseSize")}: {product.caseSize}
            </span>
            <span
              className={`text-sm font-medium ${
                product.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.isAvailable
                ? useTranslation().t("productDetail.available")
                : useTranslation().t("productDetail.notAvailable")}
            </span>
          </div>

          <p className="text-sm text-muted mb-3 text-left">
            {useTranslation().t("productDetail.leadTime")}:{" "}
            {product.leadTimeDays} {useTranslation().t("productDetail.days")}
          </p>

          {isAuthenticated && (
            <p className="text-lg font-bold text-[var(--color-primary)] mb-3 text-left">
              £{product.casePrice.toFixed(2)}
            </p>
          )}

          <Link
            to={`/product/${product.barcode}`}
            className="block w-full bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors text-center mt-auto"
          >
            {useTranslation().t("productDetail.viewDetails")}
          </Link>
        </div>
      </div>
    </div>
  )
);

const ProductDetail = () => {
  const { fetchCart } = useCart();
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();
  const [isAddingToQuote, setIsAddingToQuote] = useState(false);
  const [product, setProduct] = useState<APIProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const [, setHoverImg] = useState<string>(caseImg);
  const [quantities, setQuantities] = useState({
    case: 0,
    layer: 0,
    pallet: 0,
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<APIProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { t } = useTranslation();
  const [hoveredButton, setHoveredButton] = useState<
    "case" | "layer" | "pallet" | null
  >(null);
  const handleButtonHover = (buttonType: "case" | "layer" | "pallet") => {
    setHoveredButton(buttonType);
  };
  const handleButtonLeave = () => {
    setHoveredButton(null);
  };
  const getHoverImage = () => {
    switch (hoveredButton) {
      case "case":
        return caseImg;
      case "layer":
        return layerImg;
      case "pallet":
        return palletImg;
      default:
        return caseImg;
    }
  };
  const fetchProduct = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/Products/${barcode}`, {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIProduct = await response.json();
      setProduct(data);

      if (data.categoryId) {
        fetchRelatedProducts(data.categoryId, data.barcode);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      setError(t("productDetail.fetchError"));
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  }, [barcode, t]);
  const fetchRelatedProducts = useCallback(
    async (categoryId: number, currentBarcode: string) => {
      try {
        const response = await fetch(
          `${API_URL}/Products/category/${categoryId}`,
          {
            method: "GET",
            headers: {
              accept: "text/plain",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: APIProduct[] = await response.json();
        const filteredData = data
          .filter((product) => product.barcode !== currentBarcode)
          .slice(0, 8);
        setRelatedProducts(filteredData);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    },
    []
  );
  // Add product to cart using API directly
  const addToCart = useCallback(
    async (barcode: string, quantity: number, isCase: boolean) => {
      try {
        if (!token) {
          setError(t("productDetail.loginRequired"));
          navigate("/login");
          return false;
        }

        const response = await fetch(
          `${API_URL}/Cart/add?barcode=${encodeURIComponent(
            barcode
          )}&quantity=${quantity}&isCase=${isCase}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          setSuccessMessage(t("productDetail.addToCartSuccess"));
          setTimeout(() => setSuccessMessage(null), 3000);
          return true;
        } else if (response.status === 401) {
          setError(t("productDetail.authError"));
          return false;
        } else {
          setError(t("productDetail.addToCartError"));
          return false;
        }
      } catch (error) {
        setError(t("productDetail.addToCartError"));
        console.error("Error adding to cart:", error);
        return false;
      }
    },
    [token, navigate, t]
  );

  useEffect(() => {
    if (barcode) {
      fetchProduct();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [barcode, fetchProduct]);

  useEffect(() => {
    if (relatedProducts.length <= 1) return;

    const startCarousel = () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }

      slideInterval.current = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % relatedProducts.length
        );
      }, 3000);
    };

    startCarousel();

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [relatedProducts.length]);

  const incrementQuantity = useCallback((type: "case" | "layer" | "pallet") => {
    setQuantities((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));

    if (type === "case") setHoverImg(caseImg);
    else if (type === "layer") setHoverImg(layerImg);
    else if (type === "pallet") setHoverImg(palletImg);
  }, []);

  const getTotalQuantity = useCallback(() => {
    if (!product) return 0;
    return (
      quantities.case +
      quantities.layer * (product.casesPerLayer || 1) +
      quantities.pallet * (product.casesPerPallet || 1)
    );
  }, [quantities, product]);

  const getTotalPrice = useCallback(() => {
    if (!product) return 0;
    return (
      quantities.case * product.casePrice +
      quantities.layer * product.casePrice * (product.casesPerLayer || 1) +
      quantities.pallet * product.casePrice * (product.casesPerPallet || 1)
    );
  }, [quantities, product]);

  const handleAddToQuote = useCallback(async () => {
    if (!product) return;

    const totalQuantity = getTotalQuantity();
    if (totalQuantity === 0) {
      setError(t("productDetail.selectItemError"));
      return;
    }

    setIsAddingToQuote(true);
    setError(null);

    try {
      const success = await addToCart(product.barcode, totalQuantity, true);

      if (success) {
        setSuccessMessage(t("productDetail.itemAdded"));
        setQuantities({ case: 0, layer: 0, pallet: 0 });
        fetchCart();
      }
    } catch (error) {
      setError(t("productDetail.addToCartError"));
    } finally {
      setIsAddingToQuote(false);
    }
  }, [product, getTotalQuantity, addToCart, t, fetchCart]);

  const toggleAccordion = useCallback(
    (section: string) => {
      setOpenAccordion(openAccordion === section ? null : section);
    },
    [openAccordion]
  );

  const nextSlide = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setCurrentSlide((prevSlide) => (prevSlide + 1) % relatedProducts.length);

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % relatedProducts.length);
    }, 3000);
  }, [relatedProducts.length]);

  const prevSlide = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + relatedProducts.length) % relatedProducts.length
    );

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % relatedProducts.length);
    }, 3000);
  }, [relatedProducts.length]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
            {error || t("productDetail.productNotFound")}
          </h1>
          <button
            onClick={fetchProduct}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors mr-2"
          >
            {t("productDetail.tryAgain")}
          </button>
          <Link
            to="/all-products"
            className="mt-4 inline-block bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            {t("productDetail.backToProducts")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        {/* Minimum Order Quantity */}
        <div className="bg-bg-secondary p-4 rounded-lg mb-6">
          <p className="text-[var(--color-primary)] font-medium">
            {t("productDetail.minOrderQuantity")}
          </p>
        </div>

        {/* Success and Error Messages */}
        {successMessage && <Message type="success" text={successMessage} />}
        {error && <Message type="error" text={error} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-bg-primary rounded-lg p-6 shadow-sm border-light border">
            <img
              src={getImageUrl(product.productImage)}
              alt={product.productName}
              className="w-full h-auto max-h-96 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x300/E6F4F3/1A2A29?text=Product+Image";
              }}
              loading="eager"
            />
          </div>

          {/* Product Details */}
          <div className="bg-bg-primary rounded-lg p-6 shadow-sm border-light border">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4">
              {product.productName}
            </h1>

            <div className="flex justify-between mb-6">
              {/* Left part: Barcode and availability status*/}
              <div className="text-left">
                <p className="text-muted">
                  {t("productDetail.barcode")}: {product.barcode}
                </p>
                <p
                  className={`text-sm font-medium ${
                    product.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.isAvailable
                    ? t("productDetail.inStock")
                    : t("productDetail.outOfStock")}
                </p>

                {isAuthenticated && (
                  <>
                    <p className="text-lg font-bold text-[var(--color-primary)] mt-4">
                      {t("productDetail.pricePerCase")}: £
                      {product.casePrice.toFixed(2)}
                    </p>
                    <p className="text-md text-[var(--color-primary)]">
                      {t("productDetail.pricePerUnit")}: £
                      {product.unitPrice.toFixed(2)}
                    </p>
                  </>
                )}

                <p className="text-sm text-muted mt-4">
                  {t("productDetail.leadTime")}: {product.leadTimeDays}{" "}
                  {t("productDetail.days")}
                </p>
              </div>

              {/* Right part: dynamic image only*/}
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={getHoverImage()}
                    alt="container"
                    className="w-80 h-60 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-6 gap-2">
              <QuantityButton
                type="case"
                onClick={() => incrementQuantity("case")}
                onMouseEnter={() => handleButtonHover("case")}
                onMouseLeave={handleButtonLeave}
                label={t("productDetail.case")}
              />
              <QuantityButton
                type="layer"
                onClick={() => incrementQuantity("layer")}
                onMouseEnter={() => handleButtonHover("layer")}
                onMouseLeave={handleButtonLeave}
                label={t("productDetail.layer")}
              />
              <QuantityButton
                type="pallet"
                onClick={() => incrementQuantity("pallet")}
                onMouseEnter={() => handleButtonHover("pallet")}
                onMouseLeave={handleButtonLeave}
                label={t("productDetail.pallet")}
              />
            </div>

            {/* Quantity information - visible to all*/}
            <div className="flex justify-between text-sm text-muted mb-6">
              <span>
                {t("productDetail.unitsPerCase")}: {product.caseSize}
              </span>
              <span>
                {t("productDetail.casesPerLayer")}:{" "}
                {product.casesPerLayer || "N/A"}
              </span>
              <span>
                {t("productDetail.casesPerPallet")}:{" "}
                {product.casesPerPallet || "N/A"}
              </span>
            </div>

            {/* Display selected quantities */}
            {(quantities.case > 0 ||
              quantities.layer > 0 ||
              quantities.pallet > 0) && (
              <div className="bg-bg-secondary p-3 rounded-md mb-4">
                <p className="text-[var(--color-primary)] font-medium">
                  {t("productDetail.selectedQuantities")}:
                </p>
                {quantities.case > 0 && (
                  <p>
                    {t("productDetail.cases")}: {quantities.case}
                  </p>
                )}
                {quantities.layer > 0 && (
                  <p>
                    {t("productDetail.layers")}: {quantities.layer}
                  </p>
                )}
                {quantities.pallet > 0 && (
                  <p>
                    {t("productDetail.pallets")}: {quantities.pallet}
                  </p>
                )}
                <p className="font-semibold mt-1">
                  {t("productDetail.totalUnits")}: {getTotalQuantity()}
                </p>
              </div>
            )}

            {/* For registered users: View quantity, price and add to quote*/}
            {isAuthenticated && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">
                    {t("productDetail.quantity")}: {getTotalQuantity()}
                  </span>
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {t("productDetail.total")}: £{getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    className="flex-1 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleAddToQuote}
                    disabled={getTotalQuantity() === 0 || isAddingToQuote}
                  >
                    {isAddingToQuote ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("productDetail.addingToQuote")}
                      </div>
                    ) : (
                      t("productDetail.addToQuote")
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* For non-registered users: Register button*/}
            {!isAuthenticated && (
              <button
                className="w-full py-3 px-6 rounded-lg font-medium bg-accent-4 text-white hover:bg-accent-4-dark transition-colors mb-6"
                onClick={() => navigate("/register")}
              >
                {t("productDetail.registerForPrices")}
              </button>
            )}

            {/* Accordion Section for Product Details */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                {t("productDetail.productDetails")}
              </h2>

              <DetailAccordion
                title={t("productDetail.description")}
                content={product.description}
                isOpen={openAccordion === "description"}
                onToggle={() => toggleAccordion("description")}
              />

              <DetailAccordion
                title={t("productDetail.ingredients")}
                content={product.ingredients}
                isOpen={openAccordion === "ingredients"}
                onToggle={() => toggleAccordion("ingredients")}
              />

              <DetailAccordion
                title={t("productDetail.usage")}
                content={product.usage}
                isOpen={openAccordion === "usage"}
                onToggle={() => toggleAccordion("usage")}
              />
            </div>

            {/* Show details button for all*/}
            <Link
              to="/all-products"
              className="block text-center text-[var(--color-primary)] hover:underline mt-4"
            >
              {t("productDetail.backToProducts")}
            </Link>
          </div>
        </div>

        {/* Related Products Carousel Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-bg-secondary p-4 rounded-lg border-light border">
              <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2 md:mb-0">
                {t("productDetail.relatedProducts")}{" "}
                {product.category?.name &&
                  t("productDetail.inCategory").replace(
                    "{category}",
                    product.category.name
                  )}
              </h2>

              <div className="flex items-center space-x-4">
                <p className="text-muted">
                  {relatedProducts.length}{" "}
                  {t("productDetail.relatedProductsCount")}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className="bg-white border border-light rounded-md p-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--color-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="bg-white border border-light rounded-md p-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[var(--color-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / Math.min(4, relatedProducts.length))
                  }%)`,
                }}
              >
                {relatedProducts.map((product) => (
                  <RelatedProductCard
                    key={product.barcode}
                    product={product}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
