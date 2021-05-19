import { useContext, useRef, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Input from "./../UI/Input";

const Cart = ({ onHideCart }) => {
  const nameRef = useRef("");
  const addressRef = useRef("");

  const cartCtx = useContext(CartContext);
  const [checkoutFormIsOpen, setCheckoutFormIsOpen] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
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
    setCheckoutFormIsOpen((prevState) => {
      return !prevState;
    });
  };

  async function addCheckoutHandler(checkout) {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/checkout.json",
      {
        method: "POST",
        body: JSON.stringify(checkout),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json()
    console.log('data:', data);
  }


  const submitHandler=(event)=>{
    event.preventDefault()
    const checkout = {
      name: nameRef.current.value,
      address: addressRef.current.value,
    }
    addCheckoutHandler(checkout);
  }

  return (
    <Modal title="Cart" onClick={onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
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
      {checkoutFormIsOpen && (
        <div>
          <h2>Checkout</h2>
          <form onSubmit={submitHandler}>
            <Input
              label="Name"
              ref={nameRef}
              input={{
                id: "name",
                type: "text",
              }}
            />
            <Input
              label="Address"
              ref={addressRef}
              input={{
                id: "address",
                type: "text",
              }}
            />
            <div className={classes.actions}>
              <button className={classes.button}>Order</button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
