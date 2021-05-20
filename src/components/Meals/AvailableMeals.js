import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  console.log("meals", meals);

  const fetchMealsHandler = useCallback(async () => {
    const response = await fetch(
      "https://react-http-f8322-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    const data = await response.json();
    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      });
    }

    setMeals(loadedMeals);
    return data;
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  let content = <p>No meals available</p>
  if (meals.length > 0) {
    content = meals.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    });
  }

  return (
    <div className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
