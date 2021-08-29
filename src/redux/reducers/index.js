import { combineReducers } from "redux";
import { formReducer } from "./form_reducer";
import { questionReducer } from "./question_reducer";
import { responseReducer } from "./response_reducer";
import { userReducer } from "./user_reducer";

const rootReducer = combineReducers({
  forms: formReducer,
  questions: questionReducer,
  responses: responseReducer,
  user: userReducer,
});
export { rootReducer };
