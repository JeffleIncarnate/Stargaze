import Navbar from "../components/navbar/navbar";
import Splash from "../components/splash/splash";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | STRGZE";
  }, []);

  return (
    <>
      <Navbar />
      <Splash />
      <Footer />
    </>
  );
};

export default HomePage;
