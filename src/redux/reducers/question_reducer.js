let initialState = {
  questions: [],
  isLoading: false,
  isError: false,
};
function questionReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_QUESTION":
      let questions = state.questions.concat([action.payload]);
      return { ...state, questions };
    case "RESET_QUESTION_STATE":
      return { ...state, questions: [] };
    default:
      return state;
  }
}

export { questionReducer };
