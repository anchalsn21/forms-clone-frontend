let initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  error: null,
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      let { user, token } = action.payload;
      return { ...state, user, token, isLoading: false };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isError: false,
      };
    case "LOGIN_FAILURE":
      return { ...state, isError: action.payload, isLoading: false };
    case "LOGOUT_FAILURE":
      return { ...state, isError: action.payload, isLoading: false };
    case "LOGIN_ATTEMPT":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export { userReducer };
