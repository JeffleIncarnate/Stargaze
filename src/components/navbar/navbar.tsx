import "./navbar.css";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Images
import { BlackSVG } from "../../assets/__img__";

// Components
import CartSmall from "../cartSmall/cartSmall";
import { ItemsContext } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [smallNavOpen, setSmallNavOpen] = useState<boolean>(false);

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [numOfItems, setNumOfItems] = useState<number>(0);

  const { items } = useContext(ItemsContext);

  const handleShoppingCartClick = () => {
    setCartOpen(true);
  };

  useEffect(() => {
    setNumOfItems(items === null ? 0 : items.length);
  }, [items]);

  useEffect(() => {
    setNumOfItems(items === null ? 0 : items.length);
  }, []);

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
        <Link to="/comingSoon">COLLECTIONS</Link>
        <Link to="/comingSoon ">ARCHIVE</Link>
      </div>

      <div className="SWW__Navar__Icons">
        <FontAwesomeIcon icon={faSearch} />
        {location.pathname === "/pay" ? null : (
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
        )}

        <FontAwesomeIcon
          onClick={() => {
            let entireNav = document.getElementById("SWW__Navar__Small");

            if (!smallNavOpen) {
              entireNav!.style.width = "100vw";
              return setSmallNavOpen(true);
            }

            entireNav!.style.width = "0vw";

            setSmallNavOpen(false);
          }}
          className="SWW__Navnar__Icons__Bars"
          icon={faBars}
        />
      </div>

      <div id="SWW__Navar__Small">
        <FontAwesomeIcon
          onClick={() => {
            let entireNav = document.getElementById("SWW__Navar__Small");

            entireNav!.style.width = "0vw";
            setSmallNavOpen(false);
          }}
          className="SWW__Navar__Small__CloseButton"
          icon={faXmark}
        />
        <Link className="SWW__Navar__Small__Link" to="/catalogue">
          CATALOGUE
        </Link>
        <Link className="SWW__Navar__Small__Link" to="/comingSoon">
          COLLECTIONS
        </Link>
        <Link className="SWW__Navar__Small__Link" to="/comingSoon ">
          ARCHIVE
        </Link>
      </div>

      {cartOpen ? <CartSmall setCartOpen={setCartOpen} /> : null}
    </nav>
  );
};

export default Navbar;
