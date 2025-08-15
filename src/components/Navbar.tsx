import { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Coffee,
  Heart,
  Home,
  Sparkles,
  Baby,
  Bath,
  MoreHorizontal,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// ** Assets
import logo from "../assets/perrline-logo.jpg";
import React from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const navigate = useNavigate();
  const categories = [
    {
      title: "Food & Drink",
      icon: Coffee,
      badge: "bg-[var(--accent-cream)] text-[var(--accent-brown)]",
      items: ["Alcohol", "Confectionery", "Drinks", "Grocery", "Tea & Coffee"],
    },
    {
      title: "Health & Wellness",
      icon: Heart,
      badge: "bg-[var(--accent-cream)] text-[var(--accent-green)]",
      items: [
        "Medicines",
        "PPE",
        "Vitamins & Supplements",
        "Dressings & Plasters",
        "Sun Care",
        "Reproductive Health & Wellness",
      ],
    },
    {
      title: "Household",
      icon: Home,
      badge: "bg-[var(--accent-cream)] text-[var(--accent-blue)]",
      items: [
        "Cleaning Supplies",
        "Dishwasher & Laundry",
        "Home Fragrance",
        "Household Essentials",
        "Toilet Paper & Tissues",
      ],
    },
    {
      title: "Beauty",
      icon: Sparkles,
      badge: "bg-[var(--accent-cream)] text-[var(--primary-gold)]",
      items: [
        "Body & Skin Care",
        "Cosmetics",
        "Hair Care",
        "Hair Removal",
        "Personal Fragrance",
      ],
    },
    {
      title: "Toiletries",
      icon: Bath,
      badge: "bg-[var(--accent-cream)] text-[var(--accent-green)]",
      items: [
        "Bath & Shower",
        "Dental",
        "Deodorant",
        "Sanitary Protection",
        "Soap & Handwash",
      ],
    },
    {
      title: "Baby Care & Child",
      icon: Baby,
      badge: "bg-[var(--accent-cream)] text-[var(--accent-blue)]",
      items: [
        "Bottles & Feeding",
        "Nappies & Cleaning",
        "Teething & Soothers",
        "Toiletries",
        "Toys",
      ],
    },
    {
      title: "Miscellaneous",
      icon: MoreHorizontal,
      badge: "bg-[var(--accent-cream)] text-[var(--text-secondary)]",
      items: [
        "Pet",
        "Garden",
        "Smoking & Vape",
        "Stationery",
        "Batteries",
        "Other",
      ],
    },
  ];
  const menuItems = [
    { label: "REGISTER/LOGIN", icon: "", path: "/login" },
    { label: "ABOUT US", icon: "", path: "/about" },
    // { label: "FAQS", icon: "", path: "/faqs" },
    { label: "CONTACT US", icon: "", path: "/contact" },
  ];
  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-[var(--primary-gold-dark)] text-[var(--text-white)] text-sm border-b border-[var(--primary-gold)]">
          <div className="container py-2">
            <div className="flex justify-end items-center space-x-6">
              {menuItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 transition-all duration-200 hover:text-[var(--primary-gold)]"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                  {idx !== menuItems.length - 1 && (
                    <span className="w-px h-4 bg-[rgba(255,255,255,0.3)]"></span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-[var(--bg-primary)]">
          <div className="container py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <img className="w-40" src={logo} alt="Perrline Logo" />
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div
                className={`relative w-full transition-all duration-200 ${
                  isSearchFocused ? "ring-2 ring-[var(--primary-gold)]" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Explore Our Catalogue..."
                  className="w-full px-4 py-3 border border-[var(--border-light)] rounded-l-md focus:outline-none focus:border-[var(--primary-gold)] text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-[var(--primary-gold)] text-[var(--text-white)] rounded-r-md hover:bg-[var(--primary-gold-dark)] transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div
                className="hidden md:flex items-center space-x-2 text-[var(--text-secondary)] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <User size={20} className="text-[var(--primary-gold)]" />
                <div className="text-sm">
                  <div className="text-[var(--text-muted)]">Your</div>
                  <div className="font-medium text-[var(--text-primary)]">
                    Account
                  </div>
                </div>
              </div>

              <div
                className="flex items-center space-x-2 text-[var(--text-secondary)] cursor-pointer"
                onClick={() => navigate("/quote")}
              >
                <ShoppingCart
                  size={20}
                  className="text-[var(--primary-gold)]"
                />
                <div className="text-sm hidden md:block">
                  <div className="text-[var(--text-muted)]">Your</div>
                  <div className="font-medium text-[var(--text-primary)]">
                    Quote
                  </div>
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
        <div className="bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
          <div className="container">
            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center py-2 space-y-2 md:space-y-0 md:space-x-8">
                {/* All Products */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <Link
                    to="/all-products"
                    className="flex items-center space-x-1 text-[var(--text-primary)] hover:text-[var(--primary-gold)] transition-colors py-2"
                  >
                    <span>All Products</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isMegaMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Mega Menu */}
                  {isMegaMenuOpen && (
                    <div className="absolute top-full left-0 w-screen max-w-6xl bg-[var(--bg-primary)] shadow-2xl border border-[var(--border-light)] rounded-lg z-50 mt-1 transform -translate-x-4">
                      <div className="p-8 grid grid-cols-1 md:grid-cols-7 gap-6">
                        {categories.map((category, index) => {
                          const IconComponent = category.icon;
                          return (
                            <div key={index} className="group">
                              <div className="mb-4">
                                <div
                                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.badge} mb-3 group-hover:scale-110 transition-transform`}
                                >
                                  <IconComponent size={24} />
                                </div>
                                <h3 className="font-semibold text-sm mb-3 group-hover:text-[var(--primary-gold)] transition-colors">
                                  {category.title}
                                </h3>
                              </div>
                              <ul className="space-y-2">
                                {category.items.map((item, i) => (
                                  <li key={i}>
                                    <a
                                      href="#"
                                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-gold)] hover:bg-[var(--accent-cream)] px-2 py-1 rounded transition-all"
                                    >
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/all-brands" className="hover:text-[var(--primary-gold)]">
                  All Brands
                </Link>
                <Link to="/price-list" className="hover:text-[var(--primary-gold)]">
                  Price List
                </Link>
                <Link to="/faqs" className="hover:text-[var(--primary-gold)]">
                  FAQ'S
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Marquee */}
      <div className="relative bg-[var(--primary-gold)] text-[var(--text-white)] overflow-hidden whitespace-nowrap">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[var(--primary-gold)] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[var(--primary-gold)] to-transparent z-10"></div>

        <div
          className="inline-block py-3"
          style={{
            animation: "marquee 18s linear infinite",
            display: "inline-block",
          }}
        >
          <span className="mx-12 font-medium text-sm tracking-wide uppercase">
            Unbeatable Prices | Free UK Delivery | Custom Buying Solutions |
            Global Logistics Experts
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
