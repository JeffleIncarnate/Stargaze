import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import CataloguePage from "./pages/catalogue";
import CartPage from "./pages/cart";
import ComingSoonPage from "./pages/comingSoon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/comingSoon" element={<ComingSoonPage />} />
    </Routes>
  );
}

export default App;
