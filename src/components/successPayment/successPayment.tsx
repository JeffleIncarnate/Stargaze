import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./successPayment.css";

const SuccessPayment = () => {
  const [number, setNumber] = useState(10);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (number === 0) {
        navigate("/");
      } else {
        setNumber(number - 1);
      }
    }, 1000);

    localStorage.clear();
  }, [number]);

  return (
    <main className="SWW__Success">
      <h1>THANK YOU FOR SHOPPING WITH US</h1>
      <p>Redirecting in {number}...</p>
    </main>
  );
};

export default SuccessPayment;
