import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

// Pages
import HomePage from "./pages/home";
import CataloguePage from "./pages/catalogue";
import CartPage from "./pages/cart";
import ComingSoonPage from "./pages/comingSoon";
import PaymentPage from "./pages/pay";

export const ItemsContext = createContext<any>(null);

interface Item {
  uuid: string;
  itemName: string;
  cost: string;
  size: string;
  qty: number;
  img: string;
}

function App() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart === null) {
      return;
    }

    setItems(JSON.parse(cart));
  }, []);

  return (
    <ItemsContext.Provider value={{ items: items, setItems: setItems }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/comingSoon" element={<ComingSoonPage />} />
        <Route path="/pay" element={<PaymentPage />} />
      </Routes>
    </ItemsContext.Provider>
  );
}

export default App;
