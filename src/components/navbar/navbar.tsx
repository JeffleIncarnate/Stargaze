import "./navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Images
import { BlackSVG } from "../../assets/__img__";
import { useEffect, useState } from "react";

// Components
import CartSmall from "../cartSmall/cartSmall";

const Navbar = () => {
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [numOfItems, setNumOfItems] = useState<number>(
    JSON.parse(localStorage.getItem("cart") ?? "[]").length
  );

  const handleShoppingCartClick = () => {
    setCartOpen((cartOpen) => !cartOpen);
  };

  useEffect(() => {
    setNumOfItems(JSON.parse(localStorage.getItem("cart") ?? "[]").length);
  }, [numOfItems]);

  return (
    <nav className="SWW__Navbar">
      <div className="SWW__Navar__Logo">
        <img
          src={BlackSVG}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="SWW__Navar__Links">
        <Link to="/catalogue">CATALOGUE</Link>
        <Link to="/">COLLECTIONS</Link>
        <Link to="/">ARCHIVE</Link>
      </div>

      <div className="SWW__Navar__Icons">
        <FontAwesomeIcon icon={faSearch} />
        <div className="SWW__Navnar__Icons__ShoppingCart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            onClick={() => {
              handleShoppingCartClick();
            }}
          />
          <div>
            <p>{numOfItems}</p>
          </div>
        </div>
      </div>

      {cartOpen ? <CartSmall setCartOpen={setCartOpen} /> : null}
    </nav>
  );
};

export default Navbar;
