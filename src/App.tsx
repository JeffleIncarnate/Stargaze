import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import Collections from "./components/catalogue/catalogue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collections" element={<Collections />} />
    </Routes>
  );
}

export default App;
