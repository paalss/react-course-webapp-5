import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onHideCart }) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = (userData) => {
    fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/checkout.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          ordererdItems: cartCtx.items
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const toggleCheckoutForm = () => {
    setIsCheckout(true);
  };

  const buttonActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={toggleCheckoutForm}>
          Checkout
        </button>
      )}
    </div>
  );

  return (
    <Modal title="Cart" onClick={onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && buttonActions}
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onHideCart} />
      )}
    </Modal>
  );
};

export default Cart;
