import Navbar from "../components/navbar/navbar";
import SuccessPayment from "../components/successPayment/successPayment";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const SuccessPaymentPage = () => {
  useEffect(() => {
    document.title = "Payment Complete | STRGZE";
  }, []);

  return (
    <>
      <Navbar />
      <SuccessPayment />
      <Footer />
    </>
  );
};

export default SuccessPaymentPage;
