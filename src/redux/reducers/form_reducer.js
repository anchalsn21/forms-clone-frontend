let initialState = {
  allForms: [],
  isLoading: false,
  isError: false,
  error: null,
};
function formReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_FORM_SUCCESS":
      let allForms = action.payload;
      return { ...state, allForms, isLoading: false, error: false };
    case "GET_FORMS":
      return { ...state, isLoading: true };
    case "GET_FORM_ERROR":
      const error = action.payload;
      return { ...state, isError: true, error, isLoading: false };
    default:
      return state;
  }
}

export { formReducer };
