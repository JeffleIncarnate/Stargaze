import "./footer.css";

import { StargazeLogoWhite } from "../../assets/__img__";

const Footer = () => {
  return (
    <footer className="SWW__Footer">
      <div className="SWW__Footer__Img">
        <img src={StargazeLogoWhite} alt="" />
      </div>
      <div className="SWW__Footer__Links">
        <p>PRIVACY POLICY</p>
        <p>TERMS & CONDITIONS</p>
        <p>REFUND POLICY</p>
      </div>
      <div className="SWW__Footer__Email">
        <p>SUPPORT@STARGAZE</p>
      </div>
    </footer>
  );
};

export default Footer;
