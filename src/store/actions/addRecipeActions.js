import { getResultById } from "../../hooks/getResultById";

const {request} = getResultById();

const addRecipeActions = {
  fetchById: (id) => {
    return function(dispatch) {
      dispatch(addRecipeActions.addRecipeFetching());
      request(id)
        .then(data => dispatch(addRecipeActions.addRecipeFetched(data.meals[0])))
        .catch(e => dispatch(addRecipeActions.addRecipeFetchingError(e)))
    }
  },
  addBlank: () => {
    return {
      type: 'ADD_BLANK'
    }
  },
  addRecipeFetching: () => {
    return {
      type: 'ADD_FETCHING'
    }
  },
  addRecipeFetched: (data) => {
    return {
      type: 'ADD_FETCHED',
      payload: data
    }
  },
  addRecipeFetchingError: (error) => {
    return {
      type: 'ADD_FETCHING_ERROR',
      payload: error
    }
  },
  addToLocal: (data) => {
    return {
      type: 'ADD_TO_LOCAL',
      payload: data
    }
  },
  removeFromLocal: (id) => {
    return {
      type: 'REMOVE_FROM_LOCAL',
      payload: id
    }
  },
  addToDetails: (data) => {
    return {
      type: 'ADD_TO_DETAILS',
      payload: data
    }
  }
}

export default addRecipeActions;