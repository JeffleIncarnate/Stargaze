import "./checkoutForm.css";

import { useState, useContext, FC } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { ItemsContext } from "../../App";

interface Item {
  uuid: string;
  itemName: string;
  cost: string;
  size: string;
  qty: number;
  img: string;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { items } = useContext(ItemsContext);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      // @ts-ignore
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  let calulateTotalIncGstAndShipping = () => {
    let total = 0;

    if (items !== null) {
      for (let i = 0; i < items.length; i++) {
        total += parseInt(items[i].cost) * items[i].qty;
      }
    }

    total += total * 0.15;
    total += 10;

    total = Math.ceil(total);

    return total;
  };

  return (
    <main className="SWW__Payment">
      {items !== null ? (
        <div className="SWW__Payment__ItemsBought">
          {items.map((item: Item) => {
            return <_ShowItems item={item} />;
          })}

          <h2>
            Total Cost Inc GST + shipping: ${calulateTotalIncGstAndShipping()}
          </h2>

          <p>
            {`Do not attempt to add items now as they will not get added to the actual payment, please go back to catalogue and try again`}
          </p>
        </div>
      ) : null}

      <form className="SWW__Payment__Form" onSubmit={handleSubmit}>
        <h2>Payment</h2>
        <PaymentElement options={{}} />

        <h2>Shipping Information</h2>
        <AddressElement
          options={{ mode: "shipping", fields: { phone: "always" } }}
        />
        <button disabled={isProcessing} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </main>
  );
};

interface _IShowItemsProps {
  item: Item;
}

const _ShowItems: FC<_IShowItemsProps> = ({ item }) => {
  let calulateTotal = () => {
    return parseInt(item.cost) * item.qty;
  };

  return (
    <div className="SWW__Payment__ItemsBought__Item">
      <img src={item.img} alt="" />
      <h2>{item.itemName}</h2>
      <h2>Total: ${calulateTotal()}</h2>
    </div>
  );
};

export default CheckoutForm;
