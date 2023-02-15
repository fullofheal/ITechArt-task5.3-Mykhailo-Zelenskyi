import AddRecipe from "../../components/AddRecipe";
import SearchRecipes from "../../components/SearchRecipes";
import RecipesList from "../../components/RecipesList";
import './recipesMain.scss';

const RecipesMain = () => {

  return <div className="main__wrapper">
    <RecipesList/>
    <SearchRecipes/>
    <AddRecipe/>
  </div>
}

export default RecipesMain;