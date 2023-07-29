import "./openItemModal.css";

import { FC, useState } from "react";
import { Item } from "../catalogue";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface IOpenItemModal {
  openItem: Item;
  setOpenItem: (item: Item | null) => void;
}

interface ICartItem {
  uuid: string;
  itemName: string;
  cost: string;
  size: string;
  qty: number;
}

const OpenItemModal: FC<IOpenItemModal> = ({ openItem, setOpenItem }) => {
  let [qty, setQty] = useState<number>(1);
  let [size, setSize] = useState<string>("medium");

  return (
    <div className="SWW__ItemModal__Backdrop">
      <button
        onClick={() => {
          setOpenItem(null);
        }}
      >
        X
      </button>

      <div className="SWW__ItemModal__Main">
        <_OpenItemModalLeft img={openItem.img} />
        <_OpenItemModalRight
          item={openItem}
          qty={qty}
          setQty={setQty}
          size={size}
          setSize={setSize}
        />
      </div>
    </div>
  );
};

interface _IOpenItemModalLeft {
  img: string;
}

const _OpenItemModalLeft: FC<_IOpenItemModalLeft> = ({ img }) => {
  return (
    <div className="SWW__ItemModal__Main__Left">
      <img src={img} alt="" />
    </div>
  );
};

interface _IOpenItemModalRight {
  item: Item;
  setQty: (qty: number) => void;
  qty: number;
  setSize: (size: string) => void;
  size: string;
}

const _OpenItemModalRight: FC<_IOpenItemModalRight> = ({
  item,
  qty,
  size,
  setSize,
}) => {
  return (
    <div className="SWW__ItemModal__Main__Right">
      <h2>{item.itemName}</h2>
      <p>${item.cost} NZD</p>
      <__OpenIemModalRightSize size={size} setSize={setSize} />
      <button
        onClick={() => {
          let cartItem: ICartItem = {
            uuid: item.uuid,
            itemName: item.itemName,
            cost: item.cost,
            size: size,
            qty: qty,
          };

          // Get the Current Cart
          let currentCartDataString: string | null =
            localStorage.getItem("cart");

          // Check if the sesion storage is null
          if (currentCartDataString === null) {
            let initData: ICartItem[] = [cartItem];
            return localStorage.setItem("cart", JSON.stringify(initData));
          }

          // else we just use the current cart data
          let currentCartData: ICartItem[] = JSON.parse(currentCartDataString);

          const getItemValue = currentCartData.filter(
            (x) => x.uuid === cartItem.uuid && x.size === cartItem.size
          );

          console.log(getItemValue);

          // If That item is not found then we just append it to the array
          if (getItemValue.length === 0) {
            currentCartData.push(cartItem);

            return localStorage.setItem(
              "cart",
              JSON.stringify(currentCartData)
            );
          }

          // Get the index of that item
          let index = 0;
          for (let i = 0; i < currentCartData.length; i++) {
            let tmp = { ...getItemValue };

            if (JSON.stringify(currentCartData[i]) === JSON.stringify(tmp[0])) {
              index = i;
            }
          }

          let newItem: ICartItem = {
            uuid: cartItem.uuid,
            itemName: cartItem.itemName,
            cost: cartItem.cost,
            size: cartItem.size,
            qty: getItemValue[0].qty + 1,
          };

          currentCartData[index] = newItem;

          return localStorage.setItem("cart", JSON.stringify(currentCartData));
        }}
        className="SWW__ItemModal__Main__Right__AddToCart"
      >
        ADD TO CART
      </button>
      <__OpenIemModalRightDropdown
        name="DESCRIPTION"
        text="Lorem ipsum dolar sit"
      />
      <__OpenIemModalRightDropdown
        name="SIZE GUIDE"
        text="Lorem ipsum dolar sit"
      />
      <__OpenIemModalRightDropdown
        name="WASH INSTRUCTIONS"
        text="Lorem ipsum dolar sit"
      />
      <__OpenIemModalRightDropdown
        name="PRE ORDER INFORMATION"
        text="Lorem ipsum dolar sit"
      />
    </div>
  );
};

interface __IOpenIemModalRightSize {
  setSize: (qty: string) => void;
  size: string;
}

const __OpenIemModalRightSize: FC<__IOpenIemModalRightSize> = ({
  size,
  setSize,
}) => {
  return (
    <div className="SWW__ItemModal__Main__Right__Sizes">
      <button
        className={
          size === "small"
            ? "SWW__ItemModal__Main__Right__Sizes__Active"
            : "SWW__ItemModal__Main__Right__Sizes__NotActive"
        }
        onClick={() => {
          setSize("small");
        }}
      >
        Small
      </button>
      <button
        className={
          size === "medium"
            ? "SWW__ItemModal__Main__Right__Sizes__Active"
            : "SWW__ItemModal__Main__Right__Sizes__NotActive"
        }
        onClick={() => {
          setSize("medium");
        }}
      >
        Medium
      </button>
      <button
        className={
          size === "large"
            ? "SWW__ItemModal__Main__Right__Sizes__Active"
            : "SWW__ItemModal__Main__Right__Sizes__NotActive"
        }
        onClick={() => {
          setSize("large");
        }}
      >
        Large
      </button>
    </div>
  );
};

interface __IOpenIemModalRightDropdown {
  name: string;
  text: string;
}

const __OpenIemModalRightDropdown: FC<__IOpenIemModalRightDropdown> = ({
  name,
  text,
}) => {
  let [openDropdown, setOpenDowndown] = useState<boolean>(false);

  return (
    <div
      className="SWW__ItemModal__Main__Right__Dropdown"
      onClick={() => {
        setOpenDowndown(!openDropdown);
      }}
    >
      <div className="SWW__ItemModal__Main__Right__Dropdown__Icon">
        {name} <FontAwesomeIcon icon={openDropdown ? faMinus : faPlus} />
      </div>
      {openDropdown ? (
        <div className="SWW__ItemModal__Main__Right__Dropdown__Text">
          {text}
        </div>
      ) : null}
    </div>
  );
};

export default OpenItemModal;
