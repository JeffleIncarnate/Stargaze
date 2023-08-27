import "./carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const WordCarousel = () => {
  return (
    <div className="SWW__Marquee">
      <FontAwesomeIcon className="SWW__Marquee__Icon" icon={faInfoCircle} />
      <p>
        WEBSITE STILL UNDER DEVELOPMENT, EMAIL ALL ISSUES TO{" "}
        <a href="mailto:support@strgze.com">SUPPORT@STRGZE.COM</a>
      </p>
    </div>
  );
};

export default WordCarousel;
