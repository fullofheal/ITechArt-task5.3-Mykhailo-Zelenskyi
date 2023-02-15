const localStorageRecipes = JSON.parse(localStorage.getItem("state"));

const initialState = {
  recipesList: localStorageRecipes ? localStorageRecipes.recipesList : [],
  loading: false,
  error: null
};

function localRecipesReducer(state = initialState, action) {
  let returnValue;
  switch(action.type) {
    case 'ADD_TO_LOCAL': 
      const isUpdate = state.recipesList.find(item => item.id === action.payload.id);
      returnValue = {
        ...state,
        recipesList: isUpdate ? state.recipesList.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item;
        }) : [...state.recipesList, action.payload]
      };
      localStorage.setItem('state', JSON.stringify(returnValue));
      return returnValue;
    case 'REMOVE_FROM_LOCAL':
      returnValue = {
        ...state,
        recipesList: state.recipesList.filter(item => item.id !== action.payload)
      };
      localStorage.setItem("state", JSON.stringify(returnValue));
      return returnValue;
    default:
      return state;
  }
  
}

export default localRecipesReducer;