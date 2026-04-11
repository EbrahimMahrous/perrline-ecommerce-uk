import { useState, useEffect, useMemo, useCallback } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/TranslationContext";
// ** Assets
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
import emporioarmani from "../assets/AllBrands/emporioarmani.jpg";

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

type Brand = {
  id: number;
  name: string;
  letter: string;
  image: string;
  products: number;
};

const AllBrands = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState("");
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(true);
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
      setError(t("allBrands.fetchError"));
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const brandsList = useMemo(
    () => [
      {
        id: 1,
        name: "Arm & Hammer",
        letter: "A",
        image: armhammer,
      },
      { id: 2, name: "Aveeno", letter: "A", image: aveeno },
      { id: 3, name: "AXE", letter: "A", image: AXE },
      { id: 4, name: "Cetaphil", letter: "C", image: Cetaphil },
      { id: 5, name: "Dettol", letter: "D", image: Dettol },
      { id: 6, name: "Dior", letter: "D", image: Dior },
      { id: 7, name: "Dove", letter: "D", image: Dove },
      { id: 8, name: "Durex", letter: "D", image: Durex },
      { id: 9, name: "Eucerin", letter: "E", image: Eucerin },
      { id: 10, name: "Garnier", letter: "G", image: Garnier },
      { id: 11, name: "Gillette", letter: "G", image: Gillette },
      {
        id: 12,
        name: "Head & Shoulders",
        letter: "H",
        image: HeadAndShoulders,
      },
      {
        id: 13,
        name: "Herbal Essences",
        letter: "H",
        image: HerbalEssences,
      },
      { id: 14, name: "Huggies", letter: "H", image: Huggies },
      { id: 15, name: "Johnson's", letter: "J", image: Johnson },
      {
        id: 16,
        name: "Johnson's Baby",
        letter: "J",
        image: JohnsonBaby,
      },
      { id: 17, name: "Kotex", letter: "K", image: Kotex },
      { id: 18, name: "Lifebuoy", letter: "L", image: Lifebuoy },
      { id: 19, name: "L'Oreal", letter: "L", image: LOreal },
      { id: 20, name: "Lux", letter: "L", image: Lux },
      { id: 21, name: "Nair", letter: "N", image: Nair },
      {
        id: 22,
        name: "Neutrogena",
        letter: "N",
        image: Neutrogena,
      },
      { id: 23, name: "Olay", letter: "O", image: Olay },
      { id: 24, name: "Oral-B", letter: "O", image: OralB },
      { id: 25, name: "Palmer's", letter: "P", image: Palmer },
      { id: 26, name: "Pampers", letter: "P", image: Pampers },
      { id: 27, name: "Pantene", letter: "P", image: Pantene },
      { id: 28, name: "Pears", letter: "P", image: Pears },
      { id: 29, name: "Beauty Formulas", letter: "B", image: BeautyFormulas },
      { id: 30, name: "Batiste", letter: "B", image: batiste },
      { id: 31, name: "Brushworks", letter: "B", image: brushworks },
      { id: 32, name: "Alberto Balsam", letter: "A", image: albertobalsam },
      { id: 33, name: "Alpecin", letter: "A", image: alpecin },
      {
        id: 34,
        name: "Abercrombie & Fitch",
        letter: "A",
        image: abercrombiefitch,
      },
      { id: 35, name: "Afnan", letter: "A", image: afnan },
      {
        id: 36,
        name: "Agent Provocateur",
        letter: "A",
        image: agentprovocateur,
      },
      { id: 37, name: "Anna Sui", letter: "A", image: annasui },
      { id: 38, name: "Aramis", letter: "A", image: aramis },
      { id: 39, name: "Bert & Bert", letter: "B", image: bertbert },
      { id: 40, name: "Bic", letter: "B", image: bic },
      { id: 41, name: "Bristows", letter: "B", image: bristows },
      { id: 42, name: "Aussie", letter: "A", image: aussie },
      { id: 43, name: "Emporioarmani", letter: "E", image: emporioarmani },
    ],
    []
  );
  const brandsWithActualCounts: Brand[] = useMemo(() => {
    return brandsList.map((brand) => {
      const productCount = products.filter(
        (product) => product.brand === brand.name
      ).length;
      return { ...brand, products: productCount };
    });
  }, [products, brandsList]);

  const alphabet = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), []);
  const lettersWithBrands = useMemo(() => {
    return [...new Set(brandsWithActualCounts.map((brand) => brand.letter))];
  }, [brandsWithActualCounts]);

  const scrollToLetter = useCallback(
    (letter: string) => {
      if (lettersWithBrands.includes(letter)) {
        setActiveLetter(letter);
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lettersWithBrands]
  );

  const filteredBrands = useMemo(
    () =>
      brandsWithActualCounts.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [brandsWithActualCounts, searchTerm]
  );

  const brandsByLetter = useMemo(() => {
    const result: { [key: string]: typeof brandsWithActualCounts } = {};
    alphabet.forEach((letter) => {
      result[letter] = filteredBrands.filter(
        (brand) => brand.letter === letter
      );
    });
    return result;
  }, [filteredBrands, alphabet]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".brands-section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.id.replace("letter-", "");
        }
      });

      setActiveLetter(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-3)] py-12 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("allBrands.title")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t("allBrands.description")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-bg-primary rounded-xl shadow-md p-6 -mt-16 relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center bg-bg-secondary rounded-full px-4 py-2 border border-border-light">
            <svg
              className="w-5 h-5 text-[var(--color-primary)] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder={t("allBrands.searchPlaceholder")}
              className="bg-transparent w-full py-2 px-2 outline-none text-primary"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
            <strong className="font-bold">{t("allBrands.error")}: </strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={fetchProducts}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              {t("allBrands.tryAgain")}
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
            {/* Alphabet Navigation */}
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-bg-primary rounded-lg shadow-sm mt-8 mb-8">
              {alphabet.map((letter) => {
                const hasBrands = lettersWithBrands.includes(letter);
                return (
                  <button
                    key={letter}
                    disabled={!hasBrands}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${
                      activeLetter === letter
                        ? "bg-primary text-white"
                        : hasBrands
                        ? "bg-accent-2 text-[var(--color-primary)] hover:bg-primary hover:text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => scrollToLetter(letter)}
                    title={
                      hasBrands
                        ? t("allBrands.browseBrands", { letter })
                        : t("allBrands.noBrandsForLetter", { letter })
                    }
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Brands Sections - Only show letters that have brands */}
            <div className="brands-container">
              {alphabet
                .filter((letter) => lettersWithBrands.includes(letter))
                .map((letter) => (
                  <div
                    key={letter}
                    id={`letter-${letter}`}
                    className="brands-section mb-12"
                  >
                    <h2 className="text-3xl font-bold text-accent-1 pb-2 border-b-2 border-border-light mb-6 flex items-center text-[var(--color-primary)]">
                      <span className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mr-4 text-xl">
                        {letter}
                      </span>
                      {t("allBrands.brandsStartingWith", { letter })}
                    </h2>

                    {brandsByLetter[letter].length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
                        {brandsByLetter[letter].map((brand) => (
                          <BrandCard key={brand.id} brand={brand} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted italic">
                        {t("allBrands.noBrandsForLetterInFilter", { letter })}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Empty State for Search */}
            {filteredBrands.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="bg-bg-primary rounded-xl shadow-md p-8 max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 text-border-medium mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-semibold text-accent-1 mb-2">
                    {t("allBrands.noBrandsFound")}
                  </h3>
                  <p className="text-muted">
                    {t("allBrands.noBrandsMatching", { searchTerm })}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

// Separate Brand Card component for better performance
const BrandCard = ({ brand }: { brand: Brand }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/brand/${encodeURIComponent(brand.name)}`}
      className="bg-bg-primary rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg group block"
    >
      <div className="h-48 flex items-center justify-center p-4 transition-colors duration-300 ">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-h-36 max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 border-t border-border-light">
        <h3 className="font-semibold text-lg text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {brand.name}
        </h3>
        <div className="flex items-center text-muted text-sm">
          <span className="w-8 h-8 flex items-center justify-center bg-accent-4 text-white rounded-full mr-3 font-bold transition-colors duration-300">
            {brand.products}
          </span>
          {t("allBrands.productsAvailable")}
        </div>
      </div>
    </Link>
  );
};

export default AllBrands;
