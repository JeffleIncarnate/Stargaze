import "./cartBig.css";

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICartBigProps {}

interface Item {
  uuid: string;
  itemName: string;
  cost: string;
  size: string;
  qty: number;
  img: string;
}

const CartBig: FC<ICartBigProps> = ({}) => {
  let navigate = useNavigate();
  const [items, setItems] = useState<Item[] | null>(null);

  let calculateSubtotal = () => {
    let total = 0;
    if (items !== null) {
      items.forEach((item) => {
        total += item.qty * parseInt(item.cost);
      });
    }
    return total;
  };

  useEffect(() => {
    let cart = localStorage.getItem("cart");

    if (cart === null) {
      return;
    }

    setItems(JSON.parse(cart));
  }, []);

  return (
    <main className="SWW__CartBig">
      <div className="SWW__CartBig__Header">
        <p className="SWW__CartBig__Header__Product">PRODUCT</p>
        <p className="SWW__CartBig__Header__Price">PRICE</p>
        <p className="SWW__CartBig__Header__Quantity">QUANTITY</p>
        <p className="SWW__CartBig__Header__Total">TOTAL</p>
      </div>

      <div className="SWW__CartBig__Items">
        {items !== null && items !== undefined ? (
          <>
            <_CartBigItems
              key={crypto.randomUUID()}
              setItems={setItems}
              items={items}
            />

            <div className="SWW__CartBig__ContinueShopping">
              <button
                onClick={() => {
                  navigate("/catalogue");
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>

            <div className="SWW__CartBig__SubTotal">
              <h2>SUBTOTAL</h2>
              <h2>${calculateSubtotal()}NZD</h2>
            </div>

            <div className="SWW__CartBig__CheckOut">
              <button
                onClick={() => {
                  navigate("/pay");
                }}
              >
                CHECKOUT
              </button>
            </div>
          </>
        ) : (
          <h2>Empty</h2>
        )}
      </div>
    </main>
  );
};

interface _ICartBigItems {
  items: Item[];
  setItems: (items: Item[]) => void;
}

const _CartBigItems: FC<_ICartBigItems> = ({ items, setItems }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <__CartBigItem
            key={crypto.randomUUID()}
            item={item}
            setItems={setItems}
          />
        );
      })}
    </>
  );
};

interface __ICartBigItem {
  item: Item;
  setItems: (items: Item[]) => void;
}

const __CartBigItem: FC<__ICartBigItem> = ({ item, setItems }) => {
  let items = localStorage.getItem("cart");

  const plusOneItem = () => {
    if (items !== null) {
      let jsonItems = JSON.parse(items);

      let index = 0;

      // get the index
      for (let i = 0; i < jsonItems.length; i++) {
        if (JSON.stringify(item) === JSON.stringify(jsonItems[i])) {
          index = i;
        }
      }

      // Do all the logic
      let tmp = jsonItems[index];
      tmp.qty = jsonItems[index].qty + 1;
      jsonItems[index] = tmp;

      setItems(jsonItems);
      localStorage.setItem("cart", JSON.stringify(jsonItems));
    }
  };

  const minusOneItem = () => {
    if (items !== null) {
      let jsonItems = JSON.parse(items);

      let index = 0;

      // get the index
      for (let i = 0; i < jsonItems.length; i++) {
        if (JSON.stringify(item) === JSON.stringify(jsonItems[i])) {
          index = i;
        }
      }

      // Do all the logic
      let tmp = jsonItems[index];
      tmp.qty = jsonItems[index].qty - 1;

      if (jsonItems[index].qty - 1 < 0) {
        // Remove it from the array
        jsonItems.splice(index, 1);
        setItems(jsonItems);
        localStorage.setItem("cart", JSON.stringify(jsonItems));
        return;
      }

      jsonItems[index] = tmp;

      setItems(jsonItems);
      localStorage.setItem("cart", JSON.stringify(jsonItems));
    }
  };

  const calculateTotal = () => {
    if (items !== null) {
      let jsonItems = JSON.parse(items);

      let index = 0;

      // get the index
      for (let i = 0; i < jsonItems.length; i++) {
        if (JSON.stringify(item) === JSON.stringify(jsonItems[i])) {
          index = i;
        }
      }

      let productCost = parseInt(jsonItems[index].cost);

      let total = productCost * jsonItems[index].qty;

      return total;
    }
  };

  const removeFromCart = () => {
    if (items !== null) {
      let jsonItems = JSON.parse(items);

      let index = 0;

      // get the index
      for (let i = 0; i < jsonItems.length; i++) {
        if (JSON.stringify(item) === JSON.stringify(jsonItems[i])) {
          index = i;
        }
      }

      jsonItems.splice(index, 1);
      setItems(jsonItems);
      localStorage.setItem("cart", JSON.stringify(jsonItems));
    }
  };

  return (
    <div className="SWW__CartBig__Items__Item">
      <div className="SWW__CartBig__Items__Item__Product">
        <img src={item.img} alt="Product Image" />
        <div>
          <h2>{item.itemName}</h2>
          <p>{item.size}</p>
        </div>
      </div>

      <div className="SWW__CartBig__Items__Item__Price">
        <h2>${item.cost}NZD</h2>
      </div>

      <div className="SWW__CartBig__Items__Item__Quantity">
        <div className="SWW__CartBig__Items__Item__Quantity__Update">
          <button
            onClick={() => {
              minusOneItem();
            }}
          >
            -
          </button>
          <h2>{item.qty}</h2>
          <button
            onClick={() => {
              plusOneItem();
            }}
          >
            +
          </button>
        </div>

        <div className="SWW__CartBig__Items__Item__Quantity__Remove">
          <button
            onClick={() => {
              removeFromCart();
            }}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="SWW__CartBig__Items__Item__Total">
        ${calculateTotal()}NZD
      </div>
    </div>
  );
};

export default CartBig;
