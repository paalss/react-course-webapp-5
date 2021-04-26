import classes from "./MealItem.module.css";
import MealItemForm from "./Form/MealItemForm"

const MealItem = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <MealItemForm/>
    </li>
  );
};

export default MealItem;

/* .meal {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.meal h3 {
  margin: 0 0 0.25rem 0;
}

.description {
  font-style: italic;
}

.price {
  margin-top: 0.25rem;
  font-weight: bold;
  color: #ad5502;
  font-size: 1.25rem;
} */
