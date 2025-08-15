import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactPage: React.FC = () => {
  const contactCards = [
    {
      title: "Head Office",
      img: "https://via.placeholder.com/300x200",
      phone: "+1 (555) 123-4567",
      email: "headoffice@example.com",
      location: "Washington, DC, USA",
    },
    {
      title: "Branch Office",
      img: "https://via.placeholder.com/300x200",
      phone: "+1 (555) 987-6543",
      email: "branch@example.com",
      location: "New York, NY, USA",
    },
    {
      title: "Support Center",
      img: "https://via.placeholder.com/300x200",
      phone: "+1 (555) 222-3333",
      email: "support@example.com",
      location: "Los Angeles, CA, USA",
    },
    {
      title: "Sales Office",
      img: "https://via.placeholder.com/300x200",
      phone: "+1 (555) 444-5555",
      email: "sales@example.com",
      location: "Chicago, IL, USA",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[var(--bg-secondary)] py-10 text-center">
        <h1 className="text-3xl font-bold text-[var(--accent-brown)]">
          Contact Us Personally
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Reach out to us at any of our offices worldwide.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[var(--bg-primary)] shadow-md border border-[var(--border-light)] rounded-lg overflow-hidden"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg text-[var(--primary-gold)]">
                {card.title}
              </h2>
              <p className="text-[var(--text-secondary)]">📞 {card.phone}</p>
              <p className="text-[var(--text-secondary)]">📧 {card.email}</p>
              <p className="text-[var(--text-secondary)]">📍 {card.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Google Map */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <iframe
          title="Washington DC Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001742201816!2d-77.03687008464727!3d38.90719217957085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7be9a1b3b9f%3A0x8bcb2ce71f4e6b4!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1692201000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Questions Section */}
      <div className="bg-[var(--bg-secondary)] py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[var(--accent-brown)] mb-4">
              Have Questions?
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              If you have any questions, feel free to reach out to us.
            </p>
            <a
              href="/faq"
              className="inline-block bg-[var(--primary-gold)] text-white px-6 py-2 rounded-lg shadow hover:bg-[var(--primary-gold-dark)]"
            >
              Click Here
            </a>
          </div>
          <div className="flex-1">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Questions"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--accent-brown)] mb-6">
          Get In Touch
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-[var(--border-light)] rounded-lg p-3 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-[var(--border-light)] rounded-lg p-3 w-full"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border border-[var(--border-light)] rounded-lg p-3 w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="border border-[var(--border-light)] rounded-lg p-3 w-full"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={4}
            className="border border-[var(--border-light)] rounded-lg p-3 w-full"
          ></textarea>
          <button
            type="submit"
            className="bg-[var(--primary-gold)] text-white px-6 py-3 rounded-lg shadow hover:bg-[var(--primary-gold-dark)]"
          >
            Send Message
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
