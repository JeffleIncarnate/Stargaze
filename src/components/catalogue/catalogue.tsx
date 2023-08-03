import "./catalogue.css";

import { FC, useState } from "react";

import { Item1, Item2 } from "../../assets/__img__";
import OpenItemModal from "./openItemModal/openItemModal";

export interface Item {
  uuid: string;
  img: string;
  itemName: string;
  cost: string;
  desc: string;
  preOrder: string;
  washInfo: string;
}

const Catalogue = () => {
  let [openItem, setOpenItem] = useState<Item | null>(null);

  let items: Item[] = [
    {
      uuid: "price_1NaHSADurtyT6kdCLCP5hrXF",
      img: Item1,
      itemName: "CMWYSG TEE",
      cost: "50.00",
      desc: "Premium oversized box tee, includes puff and screen print. designed in mind for anyone trying to rizz up that special someone",
      preOrder:
        "Please note that the wait time is subject to change based on manufacturing and shipping constraints. We will keep you informed of any updates and progress regarding your order.",
      washInfo: "WASH MACHINE, DO NOT BLEACH, DO NOT TUMBLE, DO NOT DRY CLEAN",
    },
    {
      uuid: "price_1NaHTSDurtyT6kdC0yq1A8gJ",
      img: Item2,
      itemName: "STRGZE OG TEE",
      cost: "50.00",
      desc: "Introducing our premium oversized box tee, crafted from 100% cotton for unparalleled comfort. Designed with streetwear in mind, it features a high ribbed neck and slouched shoulders for a relaxed fit. The tee boasts both puff and screen print detailing perfect for a night out stargazing",
      preOrder:
        "Please note that the wait time is subject to change based on manufacturing and shipping constraints. We will keep you informed of any updates and progress regarding your order.",
      washInfo: "WASH MACHINE, DO NOT BLEACH, DO NOT TUMBLE, DO NOT DRY CLEAN",
    },
  ];

  return (
    <main className="SWW__Catalogue">
      {items.map((item) => {
        return (
          <_CollectionsItem
            key={crypto.randomUUID()}
            item={item}
            setOpenItem={setOpenItem}
          />
        );
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
