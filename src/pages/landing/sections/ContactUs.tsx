import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Send,
  MessageCircle,
  User,
  Building,
} from "lucide-react";

export default function ContactUs() {
  const offices = [
    {
      id: 1,
      name: "Head Office",
      country: "UK",
      flag: "🇬🇧",
      phone: "+44 (0) 1306 621 060",
      email: "info@sianwholesale.com",
      address: "Gardiners Cottage, Ducks Hill, Ockley, Surrey RH5 5RR UK",
      image: "/api/placeholder/300/200",
      type: "headquarters",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Warehouse",
      country: "UK",
      flag: "🇬🇧",
      phone: "+44 (0) 1306 776 251",
      email: "warehouse@sianwholesale.com",
      address: "Galton Road, B33 Tru Estate, Bedford, MK41 0HR",
      image: "/api/placeholder/300/200",
      type: "warehouse",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      name: "Chelmsford Office",
      country: "UK",
      flag: "🇬🇧",
      phone: "+44 (0) 1245 123 456",
      email: "info@sianwholesale.com",
      address:
        "Suite 4 Baddow Park Estate, West Hanningfield Road, Great Baddow, Chelmsford, CM2 7SY",
      image: "/api/placeholder/300/200",
      type: "office",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      name: "Netherlands Warehouse",
      country: "Netherlands",
      flag: "🇳🇱",
      phone: "+31 (0) 88181812",
      email: "sales@sianwholesale.nl",
      address: "Rijksstraatweg 755 - Unit 1 2132 NM Hoofddorp The Netherlands",
      image: "/api/placeholder/300/200",
      type: "warehouse",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            Contact Us
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Where to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              find us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wholesale Distribution starts from our UK and Netherlands Warehouses
            where we supply products from global brands around the world
          </p>
        </div>

        {/* Offices Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {offices.map((office) => (
            <div key={office.id} className="group">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden h-full">
                {/* Office Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${office.color} flex items-center justify-center relative`}
                  >
                    {/* Building Icon */}
                    <div className="text-white/20">
                      {office.type === "headquarters" && (
                        <Building2 className="w-24 h-24" />
                      )}
                      {office.type === "warehouse" && (
                        <Building className="w-24 h-24" />
                      )}
                      {office.type === "office" && (
                        <Building2 className="w-24 h-24" />
                      )}
                    </div>

                    {/* Country Flag */}
                    <div className="absolute top-4 right-4 text-3xl bg-white rounded-full p-2 shadow-lg">
                      {office.flag}
                    </div>

                    {/* Office Type Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {office.type}
                    </div>
                  </div>
                </div>

                {/* Office Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    {office.name}
                    <span className="ml-2 text-sm">{office.flag}</span>
                  </h3>

                  {/* Contact Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Phone
                        </p>
                        <p className="text-sm text-gray-600">{office.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Email
                        </p>
                        <p className="text-sm text-gray-600">{office.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Address
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button
                    className={`w-full mt-6 bg-gradient-to-r ${office.color} hover:shadow-lg text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Office</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Get in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h3>
              <p className="text-gray-600 mb-8">
                Ready to start your wholesale journey? Send us a message and
                we'll get back to you within 24 hours.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+44 123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your wholesale requirements..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full">
                <h4 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h4>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">
                        Phone
                      </h5>
                      <p className="text-gray-600">+44 (0) 1306 621 060</p>
                      <p className="text-sm text-gray-500">
                        Mon-Fri 9AM-6PM GMT
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">
                        Email
                      </h5>
                      <p className="text-gray-600">info@sianwholesale.com</p>
                      <p className="text-sm text-gray-500">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">
                        Head Office
                      </h5>
                      <p className="text-gray-600">
                        Gardiners Cottage, Ducks Hill
                      </p>
                      <p className="text-gray-600">Ockley, Surrey RH5 5RR UK</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                  <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    Business Hours
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold text-gray-800">
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-gray-800">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-gray-800">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
