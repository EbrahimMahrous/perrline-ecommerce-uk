import AboutUs from "./sections/AboutUs";
import Brands from "./sections/Brands";
import CallToAction from "./sections/CallToAction";
import ContactUs from "./sections/ContactUs";
import GoFurther from "./sections/GoFurther";
import Home from "./sections/Home";
import JoinUs from "./sections/JoinUs";
import Steps from "./sections/Steps";
import Wholesaler from "./sections/Wholesaler";
import { useState } from "react";

const FloatingChatBot = () => {
  const phoneNumber = "+447443715994";
  const message = "Hello, I would like to inquire about your services";
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 How can I help you today?", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    setIsTyping(true);
    setTimeout(() => {
      const botMessages = [
        "I'm here to help!",
        "That's a great question!",
        "Let me connect you with our team.",
        "One of our experts will assist you shortly.",
        "Thanks for reaching out!",
      ];
      const randomResponse =
        botMessages[Math.floor(Math.random() * botMessages.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "var(--color-primary)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-lg)",
          cursor: "pointer",
          zIndex: 1000,
          transition: "all 0.3s ease",
          animation: "bounce 2s infinite alternate",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          e.currentTarget.style.backgroundColor = "var(--color-primary-dark)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.backgroundColor = "var(--color-primary)";
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 9V7C20 5.35 18.65 4 17 4H7C5.35 4 4 5.35 4 7V9C2.35 9 1 10.35 1 12V17C1 18.65 2.35 20 4 20H20C21.65 20 23 18.65 23 17V12C23 10.35 21.65 9 20 9ZM7 6H17C17.55 6 18 6.45 18 7V9H6V7C6 6.45 6.45 6 7 6ZM20 18H4C3.45 18 3 17.55 3 17V12C3 11.45 3.45 11 4 11H20C20.55 11 21 11.45 21 12V17C21 17.55 20.55 18 20 18Z"
            fill="white"
          />
          <path d="M8 14H6V16H8V14Z" fill="white" />
          <path d="M18 14H16V16H18V14Z" fill="white" />
          <path d="M13 14H11V16H13V14Z" fill="white" />
        </svg>
      </div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "var(--shadow-lg)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideUp 0.3s ease",
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "var(--color-primary)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#4cd964",
                  marginRight: "10px",
                }}
              ></div>
              <strong>Virtual Assistant</strong>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ×
            </button>
          </div>
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius:
                      msg.sender === "user"
                        ? "15px 15px 5px 15px"
                        : "15px 15px 15px 5px",
                    backgroundColor:
                      msg.sender === "user"
                        ? "var(--color-primary)"
                        : "var(--color-accent-2)",
                    color:
                      msg.sender === "user" ? "white" : "var(--text-primary)",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius: "15px 15px 15px 5px",
                    backgroundColor: "var(--color-accent-2)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "15px",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
            }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid var(--border-light)",
                borderRadius: "20px",
                marginRight: "10px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ↗
            </button>
          </form>
          <div
            style={{
              padding: "10px 15px",
              borderTop: "1px solid var(--border-light)",
              textAlign: "center",
            }}
          >
            <button
              onClick={handleWhatsAppRedirect}
              style={{
                backgroundColor: "#25D366",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"
                  fill="white"
                />
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes bounce {
            0% {
              transform: translateY(0px);
            }
            100% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .typing-animation {
            display: inline-flex;
            align-items: center;
            height: 17px;
          }
          .typing-animation span {
            width: 6px;
            height: 6px;
            background: var(--text-muted);
            border-radius: 50%;
            margin: 0 1px;
            animation: typing 1s infinite ease-in-out;
          }
          .typing-animation span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-animation span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes typing {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </>
  );
};

export default function LandingPage() {
  return (
    <div>
      <Home />
      <Wholesaler />
      <Brands />
      <JoinUs />
      <GoFurther />
      <Steps />
      <AboutUs />
      <ContactUs />
      <CallToAction />
      <FloatingChatBot />
    </div>
  );
}
