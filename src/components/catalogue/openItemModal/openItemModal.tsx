import "./openItemModal.css";

import { FC, useState, useContext, useEffect } from "react";
import { Item } from "../catalogue";
import { ItemsContext } from "../../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddToCart from "../../addToCart/addToCart";

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
  img: string;
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
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="SWW__ItemModal__Main">
        <_OpenItemModalLeft img={openItem.img} img2={openItem.img2} />
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
  img2: string;
}

const _OpenItemModalLeft: FC<_IOpenItemModalLeft> = ({ img, img2 }) => {
  const [openImage, setOpenImage] = useState<string>(img);

  const setFirstImage = () => {
    setOpenImage(img);
  };
  const setSecondImage = () => {
    setOpenImage(img2);
  };

  return (
    <div className="SWW__ItemModal__Main__Left">
      <img src={openImage} alt="" />

      <div className="SWW__ItemModal__Main__Left__Selector">
        <img src={img} alt="" onClick={setFirstImage} />
        <img src={img2} alt="" onClick={setSecondImage} />
      </div>
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
  const { setItems } = useContext(ItemsContext);

  const [addToCart, setAddToCart] = useState(false);

  useEffect(() => {
    if (addToCart === true) {
      setTimeout(() => {
        setAddToCart(false);
      }, 2000);
    }
  }, [addToCart]);

  return (
    <div className="SWW__ItemModal__Main__Right">
      <h2>{item.itemName}</h2>
      <p>${item.cost} NZD</p>
      <__OpenIemModalRightSize size={size} setSize={setSize} item={item} />
      <button
        onClick={() => {
          let cartItem: ICartItem = {
            uuid: item.uuid,
            itemName: item.itemName,
            cost: item.cost,
            size: size,
            qty: qty,
            img: item.img,
          };

          // Get the Current Cart
          let currentCartDataString: string | null =
            localStorage.getItem("cart");

          // Check if the sesion storage is null
          if (currentCartDataString === null) {
            let initData: ICartItem[] = [cartItem];

            setItems(initData);
            return localStorage.setItem("cart", JSON.stringify(initData));
          }

          // else we just use the current cart data
          let currentCartData: ICartItem[] = JSON.parse(currentCartDataString);

          const getItemValue = currentCartData.filter(
            (x) => x.uuid === cartItem.uuid && x.size === cartItem.size
          );

          // If That item is not found then we just append it to the array
          if (getItemValue.length === 0) {
            currentCartData.push(cartItem);

            setItems(currentCartData);
            setAddToCart(true);
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
            img: cartItem.img,
          };

          currentCartData[index] = newItem;

          setItems(currentCartData);
          setAddToCart(true);
          return localStorage.setItem("cart", JSON.stringify(currentCartData));
        }}
        className="SWW__ItemModal__Main__Right__AddToCart"
      >
        ADD TO CART
      </button>
      <__OpenIemModalRightDropdown name="DESCRIPTION" text={item.desc} />
      <__OpenIemModalRightDropdown name="SIZE GUIDE" text="e" />
      <__OpenIemModalRightDropdown
        name="WASH INSTRUCTIONS"
        text={item.washInfo}
      />
      {addToCart ? <AddToCart /> : null}
    </div>
  );
};

interface __IOpenIemModalRightSize {
  setSize: (qty: string) => void;
  size: string;
  item: Item;
}

const __OpenIemModalRightSize: FC<__IOpenIemModalRightSize> = ({
  size,
  setSize,
  item,
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
        SMALL
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
        MEDIUM
      </button>

      {item.itemName !== "STRGZE OG TEE" ? (
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
          LARGE
        </button>
      ) : (
        "LARGE SOLD OUT"
      )}
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
    <>
      {name !== "SIZE GUIDE" ? (
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
      ) : (
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
              SMALL <br></br>
              Chest: 104CM / 40.9”<br></br>
              Length: 65CM / 25.5”<br></br>
              <br></br>
              MEDIUM<br></br>
              Chest: 110CM / 43.3”<br></br>
              Length: 69CM / 27.1”<br></br>
              <br></br>
              LARGE<br></br>
              Chest: 116CM / 45.6”<br></br>
              Length: 72CM / 28.3”<br></br>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default OpenItemModal;
