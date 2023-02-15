const initialState = {
	searchResult: {
		meals: null
	},
	loading: false,
	error: null
};

function searchReducer(state = initialState, action) {

	switch(action.type) {
		case 'SEARCH_FETCHING': 
		return {
			...state,
			loading: true
		};
		case 'SEARCH_FETCHED': 
		return {
			...state,
			searchResult: action.payload,
			loading: false
		};
		case 'SEARCH_FETCHING_ERROR':
		return {
			...state,
			error: true
		}
		default:
			return state;
	}
}

export default searchReducer;