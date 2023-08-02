import WordCarousel from "../components/carousel/carousel";
import CartBig from "../components/cartBig/cartBig";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const CartPage = () => {
  useEffect(() => {
    document.title = "Cart | STRGZE";
  }, []);

  return (
    <>
      <Navbar />
      <CartBig />
      <Footer />
    </>
  );
};

export default CartPage;
