import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import addRecipeActions from "../../store/actions/addRecipeActions";
import './recipesList.scss';

const RecipesList = () => {

  const {recipesList} = useSelector(state => state.localRecipesReducer);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase())
  }

  const visibleRecipes = (recipes, searchInput) => {
    if (searchInput.length === 0) {
      return recipes
    }

    return recipes.filter(item => {
      return item.name.toLowerCase().indexOf(searchInput) > -1 || item.tags.toLowerCase().indexOf(searchInput) > -1 || item.country.toLowerCase().indexOf(searchInput) > -1
    })
  }

  const recipes = (list) => {
    return list.map((recipe, i) => {
      return (
        <div 
          className="recipes__item"
          key={recipe.id + i}>
          <div className="recipes__picture">
            <img src={recipe.picture} alt={recipe.name}/>
          </div>
          <h3>{recipe.name}</h3>
          <div className="recipes__tags">
            Tags: {recipe.tags}
          </div>
          <div className="recipes__country">
            Country of origin: {recipe.country}
          </div>
          <div className="recipes__buttons">
            <Link to={"/details"}>
              <button onClick={() => dispatch(addRecipeActions.addToDetails(recipe))}>View details / edit recipe</button>
            </Link>
            <button onClick={() => dispatch(addRecipeActions.removeFromLocal(recipe.id))}>Remove Recipe</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div data-testid="RecipesList" className="recipes__list">
      <h2>List of all added recipes</h2>
      <input 
        type="text"
        className="recipes__search"
        placeholder="Search by tags, name, or country of origin"
        value={searchInput}
        onChange={(e) => onChangeSearch(e)} />
      {recipesList.length > 0 && <div className="recipes__wrapper">
        {recipes(visibleRecipes(recipesList, searchInput))}
      </div> }
    </div>
  )
}

export default RecipesList;
