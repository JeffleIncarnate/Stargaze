import Navbar from "../components/navbar/navbar";
import Marquee from "../components/marquee/marquee";
import Splash from "../components/splash/splash";
import Footer from "../components/footer/footer";

import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | STRGZE";
  }, []);

  return (
    <>
      <Marquee />
      <Navbar />
      <Splash />
      <Footer />
    </>
  );
};

export default HomePage;
