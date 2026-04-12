import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TranslationProvider } from "./i18n";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { ContactProvider } from "./context/ContactContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ContactProvider>
          <BrowserRouter>
            <TranslationProvider>
              <App />
            </TranslationProvider>
          </BrowserRouter>
        </ContactProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
