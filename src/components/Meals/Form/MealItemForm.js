import classes from "./MealItemForm.module.css";
import Card from "../../UI/Card"
import MealItem from "../MealItem";
import Input from "./Input";

const MealItemForm = () => {
  return (
    <form className={classes.form}>
      <Input/>
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
