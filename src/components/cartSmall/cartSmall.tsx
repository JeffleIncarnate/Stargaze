import "./cartSmall.css";

import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface ICartSmall {
  setCartOpen: (open: boolean) => void;
}

interface Item {
  uuid: string;
  itemName: string;
  cost: string;
  size: string;
  qty: number;
  img: string;
}

const CartSmall: FC<ICartSmall> = ({ setCartOpen }) => {
  let navigate = useNavigate();

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    let cart = localStorage.getItem("cart");

    if (cart === null) {
      return;
    }

    setItems(JSON.parse(cart));
  }, []);

  return (
    <main className="SWW__CartSmall">
      <div className="SWW__CartSmall__Top">
        <button className="SWW__CartSmall__Close">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              handleCartClose();
            }}
          />
        </button>

        <h2>CART</h2>

        <hr />

        <div className="SWW__CartSmall__Items">
          {items !== null && items !== undefined ? (
            <_CartSmallItems
              key={crypto.randomUUID()}
              setItems={setItems}
              items={items}
            />
          ) : (
            <h2>Empty</h2>
          )}
        </div>

        <hr />
      </div>

      <div className="SWW__CartSmall__Total__Bottom">
        <div className="SWW__CartSmall__Total__Totals">
          <p>SUBTOTAL</p>
          <p>$1000NZD</p>
        </div>

        <div className="SWW__CartSmall__Total__Totals">
          <p>SHIPPING</p>
          <p>CALCULATED AT CHECKOUT</p>
        </div>

        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          CHECKOUT
        </button>
      </div>
    </main>
  );
};

interface _ICartSmallItems {
  items: Item[];
  setItems: (items: Item[]) => void;
}

const _CartSmallItems: FC<_ICartSmallItems> = ({ items, setItems }) => {
  return (
    <>
      {items.map((item: Item) => {
        return (
          <__CartSmallItem
            setItems={setItems}
            key={crypto.randomUUID()}
            item={item}
          />
        );
      })}
    </>
  );
};

interface __ICartSmallItem {
  item: Item;
  setItems: (items: Item[]) => void;
}

const __CartSmallItem: FC<__ICartSmallItem> = ({ item, setItems }) => {
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
      jsonItems[index] = tmp;

      setItems(jsonItems);
      localStorage.setItem("cart", JSON.stringify(jsonItems));
    }
  };

  return (
    <div className="SWW__CartSmall__Items__Item">
      <div className="SWW__CartSmall__Items__Item__Img">
        <img src={item.img} alt="" />
      </div>

      <div className="SWW__CartSmall__Items__Item__Data">
        <h2>{item.itemName}</h2>
        <p>{item.size}</p>
        <div>
          <button
            onClick={() => {
              minusOneItem();
            }}
          >
            -
          </button>
          <p>{item.qty}</p>
          <button
            onClick={() => {
              plusOneItem();
            }}
          >
            +
          </button>
        </div>
      </div>

      <p className="SWW__CartSmall__Items__Item__Cost">${item.cost}NZD</p>

      <FontAwesomeIcon
        className="SWW__CartSmall__Items__Item__Icon"
        icon={faTrash}
      />
    </div>
  );
};

export default CartSmall;
