import Header from "./components/Layout/Header/Header";
import MealsSummary from "./components/MealsSummary";
import AvailableMeals from "./components/Meals/AvailableMeals";
import DUMMY_MEALS from "./components/Meals/dummy-meals";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Header />
      <MealsSummary />
      <AvailableMeals meals={DUMMY_MEALS} />
    </Fragment>
  );
}

export default App;
