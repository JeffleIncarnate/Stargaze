import "./catalogue.css";

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Item1 } from "../../assets/__img__";

interface Item {
  uuid: string;
  img: string;
  itemName: string;
  cost: string;
}

const Collections = () => {
  let items: Item[] = [
    {
      uuid: "e",
      img: Item1,
      itemName: "Call me when you're Star Gazing",
      cost: "45.00",
    },
  ];

  return (
    <main className="SWW__Collections">
      {items.map((item) => {
        return <_CollectionsItem item={item} />;
      })}
    </main>
  );
};

interface _ICollectionsItem {
  item: Item;
}

const _CollectionsItem: FC<_ICollectionsItem> = ({ item }) => {
  let navigate = useNavigate();

  return (
    <div
      className="SWW__Collections__Item"
      onClick={() => {
        navigate({
          pathname: "/profile/other",
          search: `?uuid=${item.uuid}`,
        });
      }}
    >
      <img src={item.img} alt="" />
      <h2>{item.itemName}</h2>
      <p>${item.cost} NZD</p>
    </div>
  );
};

export default Collections;
