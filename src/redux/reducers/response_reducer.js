let initialState = {
  allResponses: [], // mockResponseData,
  isLoading: false,
  isError: false,
  error: null,
};
function responseReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_RESPONSE_SUCCESS":
      let allResponses = action.payload;
      return { ...state, allResponses, isLoading: false, isError: false };
    case "GET_RESPONSES":
      return { ...state, isLoading: true, isError: false };
    case "GET_RESPONSES_ERROR":
      const error = action.payload;
      return { ...state, isError: true, error };
    default:
      return state;
  }
}

export { responseReducer };
