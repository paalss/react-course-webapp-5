import classes from "./Checkout.module.css";
import Input from "./../UI/Input";
import { Fragment, useRef, useState } from "react";

const Checkout = ({ onConfirm, onCancel }) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredAddressIsTouched, setEnteredAddressIsTouched] = useState(false);

  // validation
  const isNotEmpty = (value) => value.trim() !== "";
  const enteredNameIsValid = isNotEmpty(enteredName);
  const enteredAddressIsValid = isNotEmpty(enteredAddress);

  const formIsValid = enteredNameIsValid && enteredAddressIsValid;

  // display error
  const nameHasError = !enteredNameIsValid && enteredNameIsTouched;
  const addressHasError = !enteredAddressIsValid && enteredAddressIsTouched;

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

  // access input values
  const nameRef = useRef("");
  const addressRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const checkout = {
      name: nameRef.current.value,
      address: addressRef.current.value,
    };
    onConfirm(checkout)
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError && classes.invalid
  }`;
  
  const addressControlClasses = `${classes.control} ${
    addressHasError && classes.invalid
  }`;

  return (
    <Fragment>
      <h2>Checkout</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <div className={nameControlClasses}>
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
          </div>
          <div className={addressControlClasses}>
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
            {addressHasError && (
              <p className="error-text">Address cannot be empty</p>
            )}
            <div className={classes.actions}>
              <button
                type="button"
                className={classes["button--alt"]}
                onClick={onCancel}
              >
                Cancel
              </button>
              <button className={classes.button} disabled={!formIsValid}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Checkout;
