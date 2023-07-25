import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import CataloguePage from "./pages/catalogue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
    </Routes>
  );
}

export default App;
