import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/TranslationContext";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";

// Import brand images
import armhammer from "../assets/AllBrands/armhammer.jpg";
import aveeno from "../assets/AllBrands/aveeno.jpg";
import AXE from "../assets/AllBrands/axe.jpg";
import Cetaphil from "../assets/AllBrands/cetaphil.jpg";
import Dettol from "../assets/AllBrands/dettol.jpg";
import Dior from "../assets/AllBrands/dior.jpg";
import Dove from "../assets/AllBrands/dove.jpg";
import Durex from "../assets/AllBrands/durex.jpg";
import Eucerin from "../assets/AllBrands/eucerin.jpg";
import Garnier from "../assets/AllBrands/garnier.jpg";
import Gillette from "../assets/AllBrands/gillette.jpg";
import HeadAndShoulders from "../assets/AllBrands/headshoulders.jpg";
import HerbalEssences from "../assets/AllBrands/herbalessences.jpg";
import Huggies from "../assets/AllBrands/huggies.jpg";
import Johnson from "../assets/AllBrands/johnsons.jpg";
import JohnsonBaby from "../assets/AllBrands/johnsonsbaby.jpg";
import Kotex from "../assets/AllBrands/kotex.jpg";
import Lifebuoy from "../assets/AllBrands/lifebouy.jpg";
import LOreal from "../assets/AllBrands/loreal.jpg";
import Lux from "../assets/AllBrands/lux.jpg";
import Nair from "../assets/AllBrands/nair.jpg";
import Neutrogena from "../assets/AllBrands/neutrogena.jpg";
import Olay from "../assets/AllBrands/olay.jpg";
import OralB from "../assets/AllBrands/oral-b.jpg";
import Palmer from "../assets/AllBrands/palmers.jpg";
import Pampers from "../assets/AllBrands/pampers.jpg";
import Pantene from "../assets/AllBrands/pantene.jpg";
import Pears from "../assets/AllBrands/pears.jpg";
import BeautyFormulas from "../assets/AllBrands/beautyformulas.jpg";
import batiste from "../assets/AllBrands/batiste.jpg";
import brushworks from "../assets/AllBrands/Brushworks.jpg";
import albertobalsam from "../assets/AllBrands/albertobalsam.jpg";
import alpecin from "../assets/AllBrands/alpecin.jpg";
import abercrombiefitch from "../assets/AllBrands/abercrombiefitch.jpg";
import afnan from "../assets/AllBrands/afnan.jpg";
import agentprovocateur from "../assets/AllBrands/agentprovocateur.jpg";
import annasui from "../assets/AllBrands/annasui.jpg";
import aramis from "../assets/AllBrands/aramis.jpg";
import bertbert from "../assets/AllBrands/bertbert.jpg";
import bic from "../assets/AllBrands/bic.jpg";
import bristows from "../assets/AllBrands/bristows.jpg";
import aussie from "../assets/AllBrands/aussie.jpg";
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

const BrandProducts = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const [loading, setLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
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
      setError(t("brandProducts.fetchError"));
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const brandImages: Record<string, string> = {
    "Arm & Hammer": armhammer,
    Aveeno: aveeno,
    AXE: AXE,
    Cetaphil: Cetaphil,
    Dettol: Dettol,
    Dior: Dior,
    Dove: Dove,
    Durex: Durex,
    Eucerin: Eucerin,
    Garnier: Garnier,
    Gillette: Gillette,
    "Head & Shoulders": HeadAndShoulders,
    "Herbal Essences": HerbalEssences,
    Huggies: Huggies,
    "Johnson's": Johnson,
    "Johnson's Baby": JohnsonBaby,
    Kotex: Kotex,
    Lifebuoy: Lifebuoy,
    "L'Oreal": LOreal,
    Lux: Lux,
    Nair: Nair,
    Neutrogena: Neutrogena,
    Olay: Olay,
    "Oral-B": OralB,
    "Palmer's": Palmer,
    Pampers: Pampers,
    Pantene: Pantene,
    Pears: Pears,
    "Beauty Formulas": BeautyFormulas,
    Batiste: batiste,
    Brushworks: brushworks,
    "Alberto Balsam": albertobalsam,
    Alpecin: alpecin,
    "Abercrombie & Fitch": abercrombiefitch,
    Afnan: afnan,
    "Agent Provocateur": agentprovocateur,
    "Anna Sui": annasui,
    Aramis: aramis,
    "Bert & Bert": bertbert,
    Bic: bic,
    Bristows: bristows,
    Aussie: aussie,
  };

  // Memoize filtered products to avoid recalculating on every render
  const filteredProducts = useMemo(() => {
    if (!brandName) return [];
    return products.filter((product) => product.brand === brandName);
  }, [brandName, products]);

  // Memoize brand image
  const brandImage = useMemo(() => {
    return brandName ? brandImages[brandName] : null;
  }, [brandName]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [brandName]);

  const handleLoadMore = useCallback(() => {
    setProductsPerPage((prev) => prev + 24);
  }, []);

  const handleProductsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProductsPerPage(Number(e.target.value));
    },
    []
  );

  // Calculate pagination values
  const showingEnd = Math.min(productsPerPage, filteredProducts.length);
  const showingStart = filteredProducts.length > 0 ? 1 : 0;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          {brandImage && (
            <div className="flex justify-center mb-6">
              <img
                src={brandImage}
                alt={brandName || ""}
                className="h-32 object-contain"
                loading="eager"
              />
            </div>
          )}
          <p className="text-muted text-lg">
            {t("brandProducts.productsAvailable", {
              count: filteredProducts.length,
            })}
          </p>
        </div>

        {/* Products Grid Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-bg-secondary p-4 rounded-lg border-light border">
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-2 md:mb-0">
            {t("brandProducts.productsBy", { brand: brandName })}
          </h2>

          <div className="flex items-center space-x-4">
            <p className="text-muted">
              {t("brandProducts.showingResults", {
                start: showingStart,
                end: showingEnd,
                total: filteredProducts.length,
              })}
            </p>

            <div className="flex items-center">
              <span className="text-muted mr-2">{t("brandProducts.show")}</span>
              <select
                value={productsPerPage}
                onChange={handleProductsPerPageChange}
                className="border-light border rounded-md px-3 py-1 bg-bg-primary text-primary"
                aria-label={t("brandProducts.show")}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">{t("brandProducts.error")}: </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={fetchProducts}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              {t("brandProducts.tryAgain")}
            </button>
          </div>
        )}

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
                  {t("brandProducts.noProducts")}
                </p>
                <Link
                  to="/all-brands"
                  className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  {t("brandProducts.backToAllBrands")}
                </Link>
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
              {t("brandProducts.loadMore")}
            </button>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            to="/all-brands"
            className="bg-bg-secondary text-secondary px-6 py-2 rounded-md hover:bg-accent-2 transition-colors"
          >
            {t("brandProducts.backToAllBrands")}
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Separate product card component for better performance
const ProductCard = ({ product }: { product: APIProduct }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="border-light border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-bg-primary">
      <div className="p-4">
        <img
          src={getImageUrl(product.productImage)} // استخدام دالة getImageUrl هنا
          alt={product.productName}
          className="w-full h-48 object-contain mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x300/E6F4F3/1A2A29?text=Product+Image";
          }}
          loading="lazy"
        />

        <h3 className="font-semibold text-lg mb-2 text-[var(--color-primary)] text-left">
          {product.productName}
        </h3>

        <p className="text-sm text-muted mb-2 text-left">
          {t("productDetail.barcode")}: {product.barcode}
        </p>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-primary">
            {t("brandProducts.caseSize")}: {product.caseSize}
          </span>
          <span
            className={`text-sm font-medium ${
              product.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.isAvailable
              ? t("brandProducts.available")
              : t("brandProducts.notAvailable")}
          </span>
        </div>

        <p className="text-sm text-muted mb-3 text-left">
          {t("brandProducts.leadTime")}: {product.leadTimeDays}{" "}
          {t("brandProducts.days")}
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
          {t("brandProducts.viewDetails")}
        </Link>
      </div>
    </div>
  );
};

export default BrandProducts;
