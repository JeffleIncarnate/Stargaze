import "./cart.css";

import { FC } from "react";

const Cart = () => {
  return <main className="SWW__Cart"></main>;
};

interface _ICartItem {
  uuid: string;
  img: string;
  itemName: string;
  cost: string;
  qty: number;
}

const _CartItem: FC<_ICartItem> = ({}) => {
  return <div></div>
};

export default Cart;
