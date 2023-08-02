import { useEffect } from "react";

import WordCarousel from "../components/carousel/carousel";
import Navbar from "../components/navbar/navbar";
import Payment from "../components/payment/payment";
import Footer from "../components/footer/footer";

const PaymentPage = () => {
  useEffect(() => {
    document.title = "Pay | STRGZE";
  }, []);

  return (
    <>
      <WordCarousel />
      <Navbar />
      <Payment />
      <Footer />
    </>
  );
};

export default PaymentPage;
