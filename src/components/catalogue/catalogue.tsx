import "./catalogue.css";

import { FC, useState } from "react";

import { Item1 } from "../../assets/__img__";
import OpenItemModal from "./openItemModal/openItemModal";

export interface Item {
  uuid: string;
  img: string;
  itemName: string;
  cost: string;
}

const Catalogue = () => {
  let [openItem, setOpenItem] = useState<Item | null>(null);

  let items: Item[] = [
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
  ];

  return (
    <main className="SWW__Catalogue">
      {items.map((item) => {
        return <_CollectionsItem item={item} setOpenItem={setOpenItem} />;
      })}

      {openItem !== null ? (
        <OpenItemModal openItem={openItem} setOpenItem={setOpenItem} />
      ) : null}
    </main>
  );
};

interface _ICollectionsItem {
  item: Item;
  setOpenItem: (item: Item | null) => void;
}

const _CollectionsItem: FC<_ICollectionsItem> = ({ item, setOpenItem }) => {
  return (
    <div
      className="SWW__Catalogue__Item"
      onClick={() => {
        setOpenItem(item);
      }}
    >
      <img src={item.img} alt={`Item: ${item.uuid}`} />
      <h2>{item.itemName}</h2>
      <p>${item.cost} NZD</p>
    </div>
  );
};

export default Catalogue;
