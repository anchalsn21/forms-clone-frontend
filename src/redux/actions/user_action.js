import {
  loginUserApi,
  getCurrentUserApi,
  logoutUserApi,
} from "../../api/user.api";

export const attemptLogin = () => {
  return { type: "LOGIN_ATTEMPT" };
};

export const loginSuccess = (data) => {
  return { type: "LOGIN_SUCCESS", payload: data };
};

export const logoutSuccess = () => {
  return { type: "LOGOUT_SUCCESS" };
};

export const loginFailure = (error) => {
  return { type: "LOGIN_FAILURE", payload: error };
};

export const logoutFailure = (error) => {
  return { type: "LOGOUT_FAILURE", payload: error };
};

export function loginUser(googleToken) {
  return async (dispatch) => {
    try {
      // @TODO Api Hit Here and update
      dispatch(attemptLogin());
      const { data } = await loginUserApi(googleToken);
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
}

export function updateUser() {
  return async (dispatch) => {
    try {
      // @TODO Api Hit Here and update
      dispatch(attemptLogin());
      const { data } = getCurrentUserApi();
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      // @TODO Api Hit Here and update
      dispatch(attemptLogin());
      const { data } = await logoutUserApi();
      localStorage.clear();
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
      dispatch(logoutFailure(error));
    }
  };
}
