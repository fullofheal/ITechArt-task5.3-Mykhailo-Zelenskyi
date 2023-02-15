const localStorageDetails = JSON.parse(localStorage.getItem("detailsState"))

const initialState = {
  details: localStorageDetails ? localStorageDetails.details : null,
  loading: false,
  error: null
};

function detailsReducer(state = initialState, action) {
  let returnValue;
  switch(action.type) {
    case 'ADD_TO_DETAILS': 
      returnValue = {
        ...state,
        details: action.payload,
        loading: false
      }
      localStorage.setItem("detailsState", JSON.stringify(returnValue))
      return returnValue;
    default:
      return state;
  }
  
}

export default detailsReducer;