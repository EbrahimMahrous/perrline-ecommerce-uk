import { Search, FileText, CheckCircle, ArrowRight } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      number: "01",
      title: "BUILD YOUR QUOTE",
      description:
        "Select products from our extensive product range and floor stock to add to your order.",
      icon: <Search className="w-8 h-8" />,
      bgColor: "from-[var(--primary-gold)] to-[var(--accent-blue)]",
    },
    {
      number: "02",
      title: "SUBMIT YOUR REQUEST",
      description:
        "Submit your order to your Account Manager so they can cross-check your request with our stock levels and delivery details.",
      icon: <FileText className="w-8 h-8" />,
      bgColor: "from-[var(--primary-gold-light)] to-[var(--accent-green)]",
    },
    {
      number: "03",
      title: "FINALISE YOUR ORDER",
      description:
        "Your Account Manager will then contact you to finalise your order before passing this to our Operations & Logistics teams.",
      icon: <CheckCircle className="w-8 h-8" />,
      bgColor: "from-[var(--accent-green)] to-[var(--accent-blue)]",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[var(--accent-cream)] via-[var(--primary-gold-light)] to-[var(--accent-blue)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[var(--primary-gold-light)] text-[var(--accent-brown)] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            Get Started
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--accent-brown)] mb-6">
            How To Place Your Order
          </h2>
          <p className="text-xl text-[var(--accent-brown)] opacity-80 max-w-3xl mx-auto">
            Create and customise your order online and send your quote directly
            to our sales team.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[var(--primary-gold-light)]">
                {/* Step Header */}
                <div
                  className={`bg-gradient-to-r ${step.bgColor} p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <div className="text-8xl font-bold">{step.number}</div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        {step.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-80">
                          STEP {step.number}
                        </div>
                        <div className="text-2xl font-bold">{step.number}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[var(--accent-brown)] leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.bgColor}`}
                      ></div>
                      <span className="text-sm text-[var(--accent-brown)] opacity-70">
                        Step {step.number}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-[var(--primary-gold)] group-hover:text-[var(--accent-blue)] transition-colors duration-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[var(--primary-gold-light)] to-transparent z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
