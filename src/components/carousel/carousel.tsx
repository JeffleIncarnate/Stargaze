import "./carousel.css";

const WordCarousel = () => {
  return (
    <div className="SWW__Marquee">
      <div className="SWW__Marquee__Group">
        <p>PRE ORDER NOW</p>
        <p aria-hidden="true">PRE ORDER NOW</p>
        <p aria-hidden="true">PRE ORDER NOW</p>
        <p aria-hidden="true">PRE ORDER NOW</p>
        <p aria-hidden="true">PRE ORDER NOW</p>
      </div>

      <div aria-hidden="true" className="SWW__Marquee__Group">
        <p>PRE ORDER NOW</p>
        <p>PRE ORDER NOW</p>
        <p>PRE ORDER NOW</p>
        <p>PRE ORDER NOW</p>
        <p>PRE ORDER NOW</p>
      </div>
    </div>
  );
};

export default WordCarousel;
