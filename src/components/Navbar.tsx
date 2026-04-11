import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Languages,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/final-logo.jpeg";
import { useTranslation, LANGUAGES } from "../i18n";
import beautyIcon from "../assets/beauty.png";
import armhammer from "../assets/AllBrands/armhammer.jpg";
import aveeno from "../assets/AllBrands/aveeno.jpg";
import axe from "../assets/AllBrands/axe.jpg";
import dettol from "../assets/AllBrands/dettol.jpg";
import dove from "../assets/AllBrands/dove.jpg";
import cetaphil from "../assets/AllBrands/cetaphil.jpg";
import gillette from "../assets/AllBrands/gillette.jpg";
import eucerin from "../assets/AllBrands/eucerin.jpg";
import garnier from "../assets/AllBrands/garnier.jpg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchResults from "./SearchResults";
import { debounce } from "lodash";

interface Product {
  barcode: string;
  productName: string;
  brand: string;
  productImage: string;
  casePrice: number;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const { isAuthenticated, user } = useAuth();
  const { cartItems } = useCart();

  const totalCartItems = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      // إذا مررنا 50px، نصغر الـ navbar
      if (window.scrollY > 50) {
        setIsScrolled(true);
      }
      // نعيد الحجم الأصلي فقط عند الوصول لأعلى الصفحة تمامًا
      if (window.scrollY === 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN;
    setLanguage(newLanguage);
  };

  const getCurrentLanguageDisplay = () => {
    return language === LANGUAGES.EN ? "EN" : "AR";
  };

  const brandImages = {
    Armhammer: armhammer,
    Aveeno: aveeno,
    Axe: axe,
    Dettol: dettol,
    Dove: dove,
    Cetaphil: cetaphil,
    Gillette: gillette,
    Eucerin: eucerin,
    Garnier: garnier,
  };

  const categories = [
    {
      title: t("navbar.categories.beauty"),
      icon: beautyIcon,
      badge: "bg-accent-2 text-[var(--color-primary)]",
      isBeauty: true,
      items: [
        t("navbar.categoryItems.bodySkinCare"),
        t("navbar.categoryItems.cosmetics"),
        t("navbar.categoryItems.hairCare"),
        t("navbar.categoryItems.hairRemoval"),
        t("navbar.categoryItems.personalFragrance"),
      ],
    },
  ];

  const brandEntries = Object.entries(brandImages);
  const brandGroups = [
    brandEntries.slice(0, 1),
    brandEntries.slice(1, 3),
    brandEntries.slice(3, 6),
    brandEntries.slice(6, 8),
    brandEntries.slice(8, 9),
  ];

  const getUserDisplayName = () => {
    if (!user) return t("navbar.customer");

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.lastName) {
      return user.lastName;
    } else if (user.email) {
      return user.email.split("@")[0];
    } else {
      return t("navbar.customer");
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `${API_URL}/Products/search?q=${encodeURIComponent(query)}`,
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleResultSelect = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-bg-primary shadow-md transition-all duration-300 ${
          isScrolled ? "py-0" : "py-0"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-primary-dark text-white text-sm border-b border-primary">
          <div
            className={`container-custom transition-all duration-300 ${
              isScrolled ? "py-1" : "py-2"
            }`}
          >
            {/* flex + wrap For Mobile */}
            <div className="flex flex-wrap justify-end items-center gap-x-6 gap-y-2">
              {isAuthenticated ? (
                <>
                  {/* Welcome */}
                  <div className="w-full sm:w-auto flex items-center space-x-2">
                    <span className="text-accent-2">
                      {t("navbar.welcome")},
                    </span>
                    <span className="font-medium">{getUserDisplayName()}</span>
                  </div>
                  <span className="hidden sm:inline w-px h-4 bg-primary-light opacity-30"></span>
                  <Link
                    to="/quote"
                    className="flex items-center gap-2 transition-all duration-200 hover:text-accent-2"
                  >
                    {t("navbar.myQuotes")}
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 transition-all duration-200 hover:text-accent-2"
                >
                  {t("navbar.registerLogin")}
                </Link>
              )}
              <span className="hidden sm:inline w-px h-4 bg-primary-light opacity-30"></span>
              <Link
                to="/about"
                className="flex items-center gap-2 transition-all duration-200 hover:text-accent-2"
              >
                {t("navbar.aboutUs")}
              </Link>

              <span className="hidden sm:inline w-px h-4 bg-primary-light opacity-30"></span>
              <Link
                to="/contact"
                className="flex items-center gap-2 transition-all duration-200 hover:text-accent-2"
              >
                {t("navbar.contactUs")}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-bg-primary">
          <div
            className={`container-custom flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "py-2" : "py-4"
            }`}
          >
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <img
                className={`transition-all duration-300 ${
                  isScrolled ? "w-32" : "w-40"
                }`}
                src={logo}
                alt="Perrline Logo"
              />
            </div>

            {/* Search */}
            <div
              className="hidden md:flex flex-1 max-w-2xl mx-8 relative"
              ref={searchRef}
            >
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t("navbar.searchPlaceholder")}
                  className={`w-full px-4 border border-light rounded-l-md focus:outline-none focus:border-primary text-[var(--color-primary)] placeholder-muted transition-all duration-300 ${
                    isScrolled ? "py-2" : "py-3"
                  }`}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    setShowSearchResults(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
              {showSearchResults && (
                <SearchResults
                  results={searchResults}
                  onSelect={handleResultSelect}
                  isLoading={isSearching}
                />
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div
                className="hidden md:flex items-center space-x-2 text-secondary cursor-pointer"
                onClick={() =>
                  navigate(isAuthenticated ? "/my-account" : "/login")
                }
              >
                <User size={20} className="text-[var(--color-primary)]" />
                <div className="text-sm">
                  <div className="text-muted">{t("navbar.your")}</div>
                  <div className="font-medium text-[var(--color-primary)]">
                    {isAuthenticated
                      ? t("navbar.myAccount")
                      : t("navbar.account")}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <div
                  className="flex items-center space-x-2 text-secondary cursor-pointer"
                  onClick={() =>
                    navigate(isAuthenticated ? "/quote" : "/quote")
                  }
                >
                  <ShoppingCart
                    size={20}
                    className="text-[var(--color-primary)]"
                  />
                  <div className="text-sm hidden md:block">
                    <div className="text-muted">{t("navbar.your")}</div>
                    <div className="font-medium text-[var(--color-primary)]">
                      {t("navbar.quote")}
                    </div>
                  </div>
                </div>
                {/* Cart Badge */}
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </div>

              {/* Language Toggle */}
              <div
                className="flex items-center space-x-2 text-secondary cursor-pointer hover:text-[var(--color-primary)] transition-colors"
                onClick={toggleLanguage}
                title={`Switch to ${
                  language === LANGUAGES.EN ? "Arabic" : "English"
                }`}
              >
                <Languages size={20} className="text-[var(--color-primary)]" />
                <div className="text-sm hidden md:block">
                  <div className="text-muted">{t("navbar.language")}</div>
                  <div className="font-medium text-[var(--color-primary)]">
                    {getCurrentLanguageDisplay()}
                  </div>
                </div>
                <div className="md:hidden font-medium text-[var(--color-primary)]">
                  {getCurrentLanguageDisplay()}
                </div>
              </div>

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-bg-secondary border-t border-light">
          <div className="container-custom">
            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div
                className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 transition-all duration-300 ${
                  isScrolled ? "py-1" : "py-2"
                }`}
              >
                {/* All Products */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <Link
                    to="/all-products"
                    className="flex items-center space-x-1 text-[var(--color-primary)] hover:text-accent-4 transition-colors py-2 font-medium"
                  >
                    <span>{t("navbar.allProducts")}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isMegaMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  {/* Mega Menu */}
                  {isMegaMenuOpen && (
                    <div className="absolute top-full left-0 w-screen max-w-6xl bg-bg-primary shadow-lg border border-light rounded-lg z-50 mt-1 transform -translate-x-4">
                      <div className="p-8 grid grid-cols-1 md:grid-cols-7 gap-8">
                        {categories.map((category, index) => (
                          <div key={index} className="group col-span-2">
                            <div className="mb-6">
                              <div>
                                <img
                                  src={category.icon}
                                  alt={category.title}
                                  className={`object-contain ${
                                    category.isBeauty
                                      ? "w-full h-full rounded-lg"
                                      : "w-full h-full rounded-lg"
                                  }`}
                                />
                              </div>
                              <h3 className="font-semibold text-lg mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                {category.title}
                              </h3>
                            </div>
                            <ul className="space-y-3">
                              {category.items.map((item, i) => (
                                <li key={i}>
                                  <a
                                    href="#"
                                    className="text-base text-secondary hover:text-[var(--color-primary)] hover:bg-accent-2 px-2 rounded transition-all block"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {/* Brands Section */}
                        <div
                          className={`col-span-5 ${
                            language === LANGUAGES.AR ? "rtl" : "ltr"
                          }`}
                        >
                          <div className="flex flex-row gap-6 justify-between items-stretch h-full">
                            {brandGroups.map((group, groupIndex) => (
                              <div
                                key={groupIndex}
                                className={`flex flex-col gap-6 justify-around ${
                                  groupIndex === 2 ? "flex-[1.5]" : "flex-1"
                                }`}
                              >
                                {group.map(([brandName, brandImage]) => (
                                  <div
                                    key={brandName}
                                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-full"
                                    style={{ minHeight: "120px" }}
                                  >
                                    <img
                                      src={brandImage}
                                      alt={brandName}
                                      className="h-16 w-auto object-contain max-h-full max-w-full"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "80px",
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/all-brands"
                  className="text-[var(--color-primary)] hover:text-accent-4 font-medium"
                >
                  {t("navbar.allBrands")}
                </Link>
                <Link
                  to="/faqs"
                  className="text-[var(--color-primary)] hover:text-accent-4 font-medium"
                >
                  {t("navbar.faqs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Marquee */}
      <div className="relative bg-primary-light text-white overflow-hidden whitespace-nowrap z-40">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-primary-light to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-primary-light to-transparent z-10"></div>
        <div
          className="inline-block py-3"
          style={{
            animation: "marquee 18s linear infinite",
            display: "inline-block",
            willChange: "transform",
          }}
        >
          <span className="mx-12 font-medium text-sm tracking-wide uppercase">
            {t("marquee")}
          </span>
        </div>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>
    </>
  );
}
