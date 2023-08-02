import "./footer.css";

import { WhiteSVG } from "../../assets/__img__";

const Footer = () => {
  return (
    <footer className="SWW__Footer">
      <div className="SWW__Footer__Img">
        <img src={WhiteSVG} alt="" />
      </div>
      <div className="SWW__Footer__Links">
        <p>PRIVACY POLICY</p>
        <p>TERMS & CONDITIONS</p>
        <p>REFUND POLICY</p>
      </div>
      <div className="SWW__Footer__Email">
        <a href="mailto:support@stargaze.com">SUPPORT@STARGAZE.COM</a>
      </div>
    </footer>
  );
};

export default Footer;
