import WordCarousel from "../components/carousel/carousel";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const CartPage = () => {
  useEffect(() => {
    document.title = "Cart | STRGZE";
  }, []);

  return (
    <>
      <WordCarousel />
      <Navbar />
      <Footer />
    </>
  );
};

export default CartPage;
