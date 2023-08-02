import WordCarousel from "../components/carousel/carousel";
import Navbar from "../components/navbar/navbar";
import CoomingSoon from "../components/comingSoon/coomingSoon";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const ComingSoonPage = () => {
  useEffect(() => {
    document.title = "Home | STRGZE";
  }, []);

  return (
    <>
      <Navbar />
      <CoomingSoon />
      <Footer />
    </>
  );
};

export default ComingSoonPage;
