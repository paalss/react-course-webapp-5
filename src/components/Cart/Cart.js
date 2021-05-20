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

  const addCheckoutHandler = async (checkout) => {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/checkout.json",
      {
        method: "POST",
        body: JSON.stringify(checkout),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await response.json();
    // console.log("data:", data);
  };

  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredAddressIsTouched, setEnteredAddressIsTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredAddressIsValid = enteredAddress.trim() !== "";

  const nameHasError = !enteredNameIsValid && enteredNameIsTouched;
  const addressHasError = !enteredAddressIsValid && enteredAddressIsTouched;

  const formIsValid = enteredNameIsValid && enteredAddressIsValid;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const addressInputChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);
  };

  const addressInputBlurHandler = () => {
    setEnteredAddressIsTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const checkout = {
      name: nameRef.current.value,
      address: addressRef.current.value,
    };
    addCheckoutHandler(checkout);
  };

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
                value: enteredName,
                onChange: nameInputChangeHandler,
                onBlur: nameInputBlurHandler,
              }}
            />
            {nameHasError && <p className="error-text">Name cannot be empty</p>}
            <Input
              label="Address"
              ref={addressRef}
              input={{
                id: "address",
                type: "text",
                value: enteredAddress,
                onChange: addressInputChangeHandler,
                onBlur: addressInputBlurHandler,
              }}
            />
            {addressHasError && <p className="error-text">Address cannot be empty</p>}
            <div className={classes.actions}>
              <button className={classes.button} disabled={!formIsValid}>Order</button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
