const SearchActions = {
  searchFetching: () => {
    return {
      type: 'SEARCH_FETCHING'
    }
  },
  searchFetched: (data) => {
    return {
      type: 'SEARCH_FETCHED',
      payload: data
    }
  },
  searchFetchingError: (error) => {
    return {
      type: 'SEARCH_FETCHING_ERROR',
      payload: error
    }
  }
}

export default SearchActions;