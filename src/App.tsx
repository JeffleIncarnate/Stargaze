import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
