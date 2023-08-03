import "./addToCart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const AddToCart = () => {
  return (
    <div className="SWW__AddToCart">
      <FontAwesomeIcon icon={faCheck} className="SWW__AddToCart__Icon" />
      <p className="SWW__AddToCart__Text">Item added to cart</p>
    </div>
  );
};

export default AddToCart;
