let addQuestionAction = (question) => {
  return { type: "ADD_NEW_QUESTION", payload: question };
};

let resetQuestionAction = (t) => {
  return { type: "RESET_QUESTION_STATE" };
};

export { addQuestionAction, resetQuestionAction };
