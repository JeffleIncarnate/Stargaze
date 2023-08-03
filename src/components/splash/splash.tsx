import "./splash.css";

import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <header className="SWW__Splash">
      <button
        onClick={() => {
          navigate("/catalogue");
        }}
      >
        SHOP NOW
      </button>
    </header>
  );
};

export default Splash;
