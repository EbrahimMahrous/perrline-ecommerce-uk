import {
  ArrowRight,
  Star,
  Users,
  ShoppingBag,
  TrendingUp,
  Zap,
  Gift,
  Crown,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function CallToAction() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "10,000+",
      label: "Happy Customers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      number: "50,000+",
      label: "Products Sold",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "98%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Crown className="w-8 h-8" />,
      number: "15+",
      label: "Years Experience",
      color: "from-orange-500 to-red-500",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Delivery",
      description: "Get your products delivered within 24-48 hours",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Exclusive Wholesale Prices",
      description: "Access to special pricing for bulk orders",
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Only the finest products from trusted brands",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service support",
    },
  ];

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Now",
      value: "+44 (0) 1306 621 060",
      color: "from-blue-500 to-blue-600",
      action: "tel:+441306621060",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Us",
      value: "info@sianwholesale.com",
      color: "from-green-500 to-green-600",
      action: "mailto:info@sianwholesale.com",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Live Chat",
      value: "Start Conversation",
      color: "from-purple-500 to-purple-600",
      action: "#chat",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Transform Your Business?
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Start Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Wholesale Journey
            </span>
            <br />
            Today!
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of successful businesses who trust us for their
            wholesale needs. Get access to premium products, unbeatable prices,
            and exceptional service.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-3 min-w-[200px]">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 border border-white/20 flex items-center space-x-3 min-w-[200px]">
              <span>View Catalog</span>
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Options */}
        {/* <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-gray-300 text-lg">
              Our team is ready to assist you. Choose your preferred way to
              connect with us.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {contactOptions.map((option, index) => (
              <a key={index} href={option.action} className="group block">
                <div
                  className={`bg-gradient-to-r ${option.color} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {option.label}
                  </h4>
                  <p className="text-white/80 text-sm">{option.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-white ml-2 font-semibold">
                Trusted by 10,000+ Businesses
              </span>
            </div>

            <p className="text-gray-300 mb-6">
              Join the growing community of successful wholesale partners
            </p>

            <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-3 mx-auto">
              <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Become a Partner Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div> */}

        {/* Bottom Decorative Element */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 text-white/60">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            <Sparkles className="w-6 h-6" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
