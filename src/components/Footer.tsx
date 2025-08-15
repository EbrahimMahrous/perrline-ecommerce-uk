import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  Building2,
  Users,
  ShoppingBag,
  Truck,
  Globe,
  Star,
  Heart,
} from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Get in touch",
      items: [
        {
          icon: <Phone className="w-4 h-4" />,
          text: "+44 (0)1306 621 060",
          link: "tel:+441306621060",
        },
        {
          icon: <Mail className="w-4 h-4" />,
          text: "info@sianwholesale.com",
          link: "mailto:info@sianwholesale.com",
        },
      ],
    },
    {
      title: "About Us",
      items: [
        { text: "Blog & News", link: "/blog" },
        { text: "Trade Shows", link: "/trade-shows" },
        { text: "Careers", link: "/careers" },
        { text: "Contact", link: "/contact" },
      ],
    },
    {
      title: "Become A Customer",
      items: [
        { text: "All Products", link: "/products" },
        { text: "Brand Search", link: "/brands" },
        { text: "Price List", link: "/pricing" },
        { text: "Grocery Wholesale", link: "/grocery" },
      ],
    },
    {
      title: "Become A Supplier",
      items: [
        { text: "Distribution", link: "/distribution" },
        { text: "Warehousing", link: "/warehousing" },
        { text: "Freight Shipping", link: "/freight" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <div className="bg-orange-500 p-2 rounded">SIAN</div>,
      name: "SIAN",
      link: "#",
      color: "bg-orange-500",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      link: "#",
      color: "bg-blue-600",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      link: "#",
      color: "bg-blue-700",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      name: "YouTube",
      link: "#",
      color: "bg-red-600",
    },
  ];

  const quickStats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "10K+",
      label: "Happy Customers",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      number: "50K+",
      label: "Products",
    },
    { icon: <Truck className="w-6 h-6" />, number: "24/7", label: "Support" },
    { icon: <Globe className="w-6 h-6" />, number: "15+", label: "Countries" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Quick Stats Bar */}
        <div className="py-8 border-b border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">SIAN</h3>
                    <p className="text-blue-400 text-sm font-semibold">
                      WHOLESALE
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Your trusted wholesale partner for premium products and
                  exceptional service. Connecting businesses worldwide since
                  2009.
                </p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={`${social.color} hover:scale-110 transition-all duration-300 rounded-lg p-2 hover:shadow-lg`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 relative">
                  {section.title}
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href={item.link}
                        className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {"icon" in item && item.icon && (
                          <span className="text-blue-400 group-hover:text-blue-300">
                            {item.icon}
                          </span>
                        )}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.text}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Newsletter Section */}
        <div className="py-8 border-b border-slate-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Stay Updated with SIAN Wholesale
              </h4>
              <p className="text-gray-400">
                Get the latest product updates, exclusive deals, and industry
                insights delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© SIAN Wholesale 2023 | All Rights Reserved</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </a>
              <a
                href="/modern-slavery"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Modern Slavery Statement
              </a>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-white text-sm ml-2">
                  Trusted by 10K+ businesses
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Made with Love */}
        <div className="text-center py-4 border-t border-slate-700">
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>for wholesale excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
