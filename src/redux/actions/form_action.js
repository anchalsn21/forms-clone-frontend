import { getAllFormsByUserIdApi } from "../../api/form.api";

export const getForms = () => {
  return { type: "GET_FORMS" };
};

export const getFormsSuccess = (forms) => {
  return { type: "GET_FORM_SUCCESS", payload: forms };
};

export const getFormsFailure = (error) => {
  return { type: "GET_FORM_ERROR", payload: error };
};

export function getAllForms() {
  return async (dispatch) => {
    try {
      dispatch(getForms());
      // @TODO Api Hit Here and update
      const { data } = await getAllFormsByUserIdApi();
      dispatch(getFormsSuccess(data?.allForms));
    } catch (error) {
      console.log(error);
      dispatch(getFormsFailure(error));
    }
  };
}
