import classes from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";

const HeaderCartButton = () => {
  return (
    <button className={classes.button}>
      <div className={classes.icon}>
        <CartIcon />
      </div>
      Your cart
      <div className={classes.badge}>2</div>
    </button>
  );
};

export default HeaderCartButton;
