const initialState = {
  details: null,
  loading: false,
  error: null
};

function addRecipeReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_FETCHING': 
      return {
        ...state,
        loading: true
      };
    case 'ADD_FETCHED': 
      const ingredients = Object.entries(action.payload).filter(item => {
        return item[0].startsWith('strIngredient') && item[1]
      });
      const measures = Object.entries(action.payload).filter(item => {
        return item[0].startsWith('strMeasure') && item[1]
      });
      const combined = ingredients.map((item, i) => {
        return [item[1], measures[i][1]]
      })
      return {
        ...state,
        details: {
          id: action.payload.idMeal,
          country: action.payload.strArea,
          category: action.payload.strCategory,
          instructions: action.payload.strInstructions,
          name: action.payload.strMeal,
          tags: action.payload.strTags ? action.payload.strTags: '',
          ingredients: combined,
          picture: action.payload.strMealThumb,
          video: action.payload.strYoutube
        },
        loading: false
      };
      
    case 'ADD_FETCHING_ERROR': 
      return {
        ...state,
        error: true
      };
    case 'ADD_BLANK':
      return {
        ...state,
        details: {
          id: '',
          country: '',
          category: '',
          instructions: '',
          name: '',
          tags: '',
          ingredients: [['','']],
          picture: '',
          video: ''
        }
      };
    default:
      return state;
  }
  
}

export default addRecipeReducer;