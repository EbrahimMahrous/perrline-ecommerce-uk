import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/TranslationContext";
import defaultProductImage from "../assets/alt-product-image.png";
import { getImageUrl } from "../utils/imageUrl";
import { useAuth } from "../context/AuthContext";

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

const AllBeautyProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const [localSearchQuery, setLocalSearchQuery] = useState(urlSearchQuery);

  const categories = [
    { id: "All", name: "All" },
    { id: "1", name: "Body & Skin Care" },
    { id: "2", name: "Cosmetics" },
    { id: "3", name: "Hair Care" },
    { id: "4", name: "Hair Removal" },
    { id: "5", name: "Personal Fragrance" },
  ];
  useEffect(() => {
    setLocalSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/Products`, {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIProduct[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError(t("allBeautyProducts.fetchError"));
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.categoryId.toString() === activeCategory
      );
    }

    // تطبيق فلتر البحث إذا كان موجوداً
    if (localSearchQuery) {
      const query = localSearchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.productName.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.barcode.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeCategory, products, localSearchQuery]);

  const getCategoryTitle = useCallback(
    (id: string) => {
      if (id === "All") return t("allBeautyProducts.allProducts");

      const category = categories.find((cat) => cat.id === id);
      return category ? category.name : id;
    },
    [t]
  );

  const handleProductsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProductsPerPage(Number(e.target.value));
    },
    []
  );

  const handleLoadMore = useCallback(() => {
    setProductsPerPage((prev) => prev + 24);
  }, []);
  const showingEnd = Math.min(productsPerPage, filteredProducts.length);
  const showingStart = filteredProducts.length > 0 ? 1 : 0;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-[var(--color-primary)]">
          {t("allBeautyProducts.title")}
        </h1>

        {/* In-page search bar */}
        <div className="flex justify-center my-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search our products here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-[var(--color-primary)]"
            />
            {localSearchQuery && (
              <button
                onClick={() => {
                  setLocalSearchQuery("");
                  setSearchParams({});
                }}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 my-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-bg-secondary text-secondary hover:bg-accent-2"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">
              {t("allBeautyProducts.error")}:{" "}
            </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={fetchProducts}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              {t("allBeautyProducts.tryAgain")}
            </button>
          </div>
        )}

        {/* Add search indicator if there is a query*/}
        {localSearchQuery && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              Show search results for: "{localSearchQuery}"
              <button
                onClick={() => {
                  setLocalSearchQuery("");
                  setSearchParams({});
                }}
                className="mr-2 text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Clear search
              </button>
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-bg-secondary p-4 rounded-lg border-light border">
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2 md:mb-0">
            {getCategoryTitle(activeCategory)}
          </h2>

          <div className="flex items-center space-x-4">
            <p className="text-muted">
              {t("allBeautyProducts.showingResults", {
                start: showingStart,
                end: showingEnd,
                total: filteredProducts.length,
              })}
            </p>

            <div className="flex items-center">
              <span className="text-muted mr-2">
                {t("allBeautyProducts.show")}
              </span>
              <select
                value={productsPerPage}
                onChange={handleProductsPerPageChange}
                className="border-light border rounded-md px-3 py-1 bg-bg-primary text-[var(--color-primary)]"
                aria-label={t("allBeautyProducts.show")}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted text-lg">
                  {t("allBeautyProducts.noProducts")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, productsPerPage).map((product) => (
                  <ProductCard key={product.barcode} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !error && filteredProducts.length > productsPerPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-bg-secondary text-secondary px-6 py-2 rounded-md hover:bg-accent-2 transition-colors"
            >
              {t("allBeautyProducts.loadMore")}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// Separate component of product card to improve performance
const ProductCard: React.FC<{ product: APIProduct }> = ({ product }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth(); // Assuming you have an auth context

  return (
    <div className="border-light border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-bg-primary">
      <div className="p-4">
        <img
          src={getImageUrl(product.productImage)}
          alt={product.productName}
          className="w-full h-48 object-contain mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultProductImage;
          }}
          loading="lazy"
        />

        <h3 className="font-semibold text-lg mb-2 text-[var(--color-primary)] text-left">
          {product.productName}
        </h3>

        <p className="text-sm text-muted mb-2 text-left">
          {t("allBeautyProducts.brand")}: {product.brand}
        </p>

        <p className="text-sm text-muted mb-2 text-left">
          {t("allBeautyProducts.barcode")}: {product.barcode}
        </p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-primary">
            {t("allBeautyProducts.caseSize")}: {product.caseSize}
          </span>
          <span
            className={`text-sm font-medium ${
              product.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.isAvailable
              ? t("allBeautyProducts.available")
              : t("allBeautyProducts.notAvailable")}
          </span>
        </div>

        <p className="text-sm text-muted mb-3 text-left">
          {t("allBeautyProducts.leadTime")}: {product.leadTimeDays}{" "}
          {t("allBeautyProducts.days")}
        </p>

        {isAuthenticated && (
          <p className="text-lg font-bold text-[var(--color-primary)] mb-3 text-left">
            £{product.casePrice.toFixed(2)}
          </p>
        )}

        <Link
          to={`/product/${product.barcode}`}
          className="block w-full bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors text-center"
        >
          {t("allBeautyProducts.viewDetails")}
        </Link>
      </div>
    </div>
  );
};

export default AllBeautyProducts;
