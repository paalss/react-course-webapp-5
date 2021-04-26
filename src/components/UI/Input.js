import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label>Amount</label>
      <input type="number" defaultValue="1"/> <br />
    </div>
  );
};

export default Input;

/**
 * 
 *
.input {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.input label {
  font-weight: bold;
  margin-right: 1rem;
}

.input input {
  width: 3rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font: inherit;
  padding-left: 0.5rem;
}
 */
