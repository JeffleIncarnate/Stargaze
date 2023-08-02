import "./payment.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import { ItemsContext } from "../../App";
import CheckoutForm from "../checkoutForm/checkoutForm";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const { items } = useContext(ItemsContext);

  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (res) => {
      const { publishableKey } = await res.json();
      // @ts-ignore
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (items !== null) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(items);

      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/create-payment-intent", requestOptions).then(
        async (result) => {
          var { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        }
      );
    }
  }, [items]);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
