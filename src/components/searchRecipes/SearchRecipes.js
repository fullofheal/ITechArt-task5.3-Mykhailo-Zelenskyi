import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchActions from "../../store/actions/searchActions";
import addRecipeActions from "../../store/actions/addRecipeActions";
import { getResultByCriteria } from "../../hooks/getResultByCriteria";
import './searchRecipies.scss';


const SearchRecipes = () => {

  const [searchCriteria, setSearchCriteria] = useState('Category');
  const [searchInput, setSearchInput] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const meals = useSelector(state => state.searchReducer.searchResult.meals);
  const {request} = getResultByCriteria();
  const dispatch = useDispatch();

  const options = ['Category', 'Ingredients', 'Country', 'Random meal'];

  const onSubmitRequest = (e) => {
    e.preventDefault();

    dispatch(SearchActions.searchFetching());
    request(searchCriteria, searchInput)
      .then(result => {
        if (result.meals === null) {
          setIncorrect(true)
        } else {
          setIncorrect(false);
          dispatch(SearchActions.searchFetched(result));
        }
      })
      .catch((e) => {
        dispatch(SearchActions.searchFetchingError(e))
      })
  }

  const optionsMenu = () => {
    return (
      <div className="search__options">
        {options.map(option => {
          return <button 
                type="button"
                className="search__option"
                key={option}
                onClick={() => {
                  setSearchInput('');
                  setSearchCriteria(option);
                  setIncorrect(false);
                }}
                >{option}
              </button>
        })}
      </div>
    )
  }

  const searchField = (criteria) => {
    let placeholderValue = "";
    
    if (criteria === 'Category') {
      placeholderValue = "e.g. 'beef', 'breakfast', 'side', etc."
    } else if (criteria === 'Ingredients') {
      placeholderValue = "e.g. 'Pork', 'Dill', 'Flour', etc."
    } else if (criteria === 'Country') {
      placeholderValue = "e.g. 'Mexican', 'British', 'Indian', etc."
    } 

    return (
      
      <div>
        {criteria === 'Random meal' ? 
        <div className="search__field">Click "search" to get a random recipe!</div> : 
        <div className="search__field">
          <div>Please specify desired {criteria === 'Country' ? `${criteria.toLowerCase()} of origin` : criteria.toLowerCase()}:</div>
          <input 
            required
            type="text"
            name={criteria}
            placeholder = {placeholderValue}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            />
        </div> }
        
      </div>
    )
  }

  const mealsList = () => {

    return <div className="search__main">
          {meals.map(meal => {
            return <div className="search__item" key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal}/>
              <div className="search__item-title">{meal.strMeal}</div>
              <button 
              type="button"
              className="search__item-add"
              onClick={() => dispatch(addRecipeActions.fetchById(meal.idMeal))}
              >Select</button>
            </div>
          })}
        </div>
  }

  return (
    <form 
      data-testid="SearchRecipes"
      className="search__wrapper"
      onSubmit={(e) => onSubmitRequest(e)}>
      <h2>Search a new recipe by one of the following criteria:</h2>
      {optionsMenu()}
      {searchField(searchCriteria)}
      {incorrect && <div>Please use different keyword</div>}
      {meals && mealsList()}
      <div className="search__buttons">
        <button type='submit' className="search__submit-btn">Search</button>
        <button 
          type='button' 
          className="search__submit-btn"
          onClick={() => dispatch(addRecipeActions.addBlank())}>Fill out your own recipe</button>
      </div>
    </form>
  )
}

export default SearchRecipes;