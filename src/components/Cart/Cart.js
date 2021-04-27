import classes from "./Cart.module.css";

const Cart = () => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: "c1", name: "dd", amount: 2, price: 232 }].map((item) => (
        <li>item.name</li>
      ))}
    </ul>
  );
  return (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>343</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
