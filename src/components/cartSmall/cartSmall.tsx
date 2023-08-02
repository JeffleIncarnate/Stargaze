import "./cartSmall.css";

import { FC, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../../App";

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

  const { items, setItems } = useContext(ItemsContext);

  let calculateSubtotal = () => {
    let total = 0;
    if (items !== null) {
      items.forEach((item: Item) => {
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

    if (cart !== JSON.stringify(items)) {
      setItems(JSON.parse(cart));
    }
  }, [items]);

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

        <div className="SWW__CartSmall__Title">
          <h2>CART</h2>
        </div>

        <hr />

        <div className="SWW__CartSmall__Items">
          {items !== null && items !== undefined && items.length !== 0 ? (
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
          <p>${calculateSubtotal()}NZD</p>
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

      <p className="SWW__CartSmall__Items__Item__Cost">
        ${calculateTotal()}NZD
      </p>

      <FontAwesomeIcon
        className="SWW__CartSmall__Items__Item__Icon"
        icon={faTrash}
        onClick={() => {
          removeFromCart();
        }}
      />
    </div>
  );
};

export default CartSmall;
