import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* Hero / About Us */}
      <section className="bg-[var(--bg-secondary)] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[var(--accent-brown)] mb-4">
            About Perrline
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Perrline is committed to delivering premium quality products with unmatched customer service.
            Based in the USA, we aim to connect people with the products they need, when they need them.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/500x350"
            alt="About Perrline"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Services & Promise */}
      <section className="py-16 px-6 md:px-20 text-center bg-[var(--bg-primary)]">
        <h2 className="text-3xl font-bold text-[var(--primary-gold)] mb-4">
          Our Services & Promise
        </h2>
        <p className="text-[var(--text-secondary)] max-w-3xl mx-auto">
          We promise to provide top-tier products, seamless delivery, and
          unmatched after-sales support. Our services are tailored to meet the
          needs of individuals and businesses across America.
        </p>
      </section>

      {/* Connecting People with Products */}
      <section className="py-16 px-6 md:px-20 bg-[var(--bg-secondary)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[var(--accent-brown)] mb-4">
              Connecting People with Products
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Our network ensures that you have access to the products you need,
              sourced from trusted suppliers and delivered to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://via.placeholder.com/250x250"
              alt="Top Image"
              className="rounded-lg shadow-lg col-span-2"
            />
            <img
              src="https://via.placeholder.com/250x250"
              alt="Bottom Left"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://via.placeholder.com/250x250"
              alt="Bottom Right"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Parallax Image */}
      <section
        className="h-96 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1200x800?text=Perrline+Parallax')",
        }}
      ></section>

      {/* Competitive Pricing */}
      <section className="py-16 px-6 md:px-20 text-center bg-[var(--bg-primary)]">
        <h2 className="text-3xl font-bold text-[var(--primary-gold)] mb-4">
          Competitive Pricing
        </h2>
        <p className="text-[var(--text-secondary)] max-w-3xl mx-auto">
          We offer market-leading prices without compromising on quality. Our
          goal is to ensure you get the best value for your money.
        </p>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-6 md:px-20 bg-[var(--bg-secondary)] text-center">
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] mb-8">
          What Our Clients Say
        </h2>
        <p className="max-w-3xl mx-auto text-[var(--text-secondary)] italic">
          "Perrline exceeded our expectations. The products arrived on time, the
          quality was superb, and the customer service was exceptional."
        </p>
      </section>

      {/* How We Help Our Clients */}
      <section className="py-16 px-6 md:px-20 bg-[var(--bg-primary)]">
        <h2 className="text-3xl font-bold text-[var(--primary-gold)] mb-4 text-center">
          How We Help Our Clients
        </h2>
        <p className="max-w-3xl mx-auto text-center text-[var(--text-secondary)]">
          From personalized product recommendations to timely deliveries, our
          team works tirelessly to ensure you get exactly what you need.
        </p>
      </section>

      {/* Done Deal with Perrline */}
      <section className="py-16 px-6 md:px-20 bg-[var(--bg-secondary)] flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] mb-4">
          Done Deal with Perrline
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 max-w-3xl">
          Partner with Perrline and experience seamless transactions,
          top-quality products, and unmatched customer satisfaction.
        </p>
        <img
          src="https://via.placeholder.com/300x150?text=Perrline+Logo"
          alt="Perrline Logo"
          className="rounded-lg shadow-md"
        />
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
