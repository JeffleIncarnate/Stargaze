import "./navbar.css";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Images
import { StargazeLogoBlack } from "../../assets/__img__";

const Navbar = () => {
  return (
    <nav className="SWW__Navbar">
      <div className="SWW__Navar__Logo">
        <img src={StargazeLogoBlack} alt="" />
      </div>

      <div className="SWW__Navar__Links">
        <Link to="/">STRGZE</Link>
        <Link to="/">COLLECTIONS</Link>
        <Link to="/">ARCHIVE</Link>
      </div>

      <div className="SWW__Navar__Icons">
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faShoppingCart} />
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </nav>
  );
};

export default Navbar;
