import Header from "./components/Header/Header"
import MealsSummary from "./components/MealsSummary"
import AvailableMeals from "./components/Meals/AvailableMeals"
import DUMMY_MEALS from "./dummy-meals"

function App() {
  return (
    <div>
      <Header />
      <MealsSummary />
      <AvailableMeals meals={DUMMY_MEALS} />
    </div>
  );
}

export default App;
