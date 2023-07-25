import "./openItemModal.css";

import { FC, useState } from "react";
import { Item } from "../catalogue";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface IOpenItemModal {
  openItem: Item;
  setOpenItem: (item: Item | null) => void;
}

const OpenItemModal: FC<IOpenItemModal> = ({ openItem, setOpenItem }) => {
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
          itemName={openItem.itemName}
          cost={openItem.cost}
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
  itemName: string;
  cost: string;
}

const _OpenItemModalRight: FC<_IOpenItemModalRight> = ({ itemName, cost }) => {
  return (
    <div className="SWW__ItemModal__Main__Right">
      <h2>{itemName}</h2>
      <p>${cost} NZD</p>
      <__OpenIemModalRightSize />
      <button>Add To Cart</button>
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

const __OpenIemModalRightSize = () => {
  const [size, setSize] = useState("medium");

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
