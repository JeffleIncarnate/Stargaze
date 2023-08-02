import Navbar from "../components/navbar/navbar";
import Catalogue from "../components/catalogue/catalogue";
import Footer from "../components/footer/footer";
import { useEffect } from "react";

const CataloguePage = () => {
  useEffect(() => {
    document.title = "Catalogue | STRGZE";
  }, []);

  return (
    <>
      <Navbar />
      <Catalogue />
      <Footer />
    </>
  );
};

export default CataloguePage;
