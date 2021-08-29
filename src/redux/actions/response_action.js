import { getAllResponseByFormIdApi } from "../../api/responses.api";

export const getResponses = () => {
  return { type: "GET_RESPONSES" };
};

export const getResponsesSuccess = (responses) => {
  return { type: "GET_ALL_RESPONSE_SUCCESS", payload: responses };
};

export const getResponsesFailure = (error) => {
  return { type: "GET_RESPONSES_ERROR", payload: error };
};

export function getAllResponses(formId) {
  return async (dispatch) => {
    try {
      // @TODO Api Hit Here and update
      dispatch(getResponses());
      const { data } = await getAllResponseByFormIdApi(formId);
      dispatch(getResponsesSuccess(data?.allResponses));
    } catch (error) {
      console.log(error);
      dispatch(getResponsesFailure(error));
    }
  };
}
