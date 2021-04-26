import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = (props) => {
  return (
    <Card>
      <div className={classes.meals}>
        <ul>
          {props.meals.map((meal) => {
            return (
              <MealItem
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default AvailableMeals;
