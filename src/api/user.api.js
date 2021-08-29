import axios from "axios";
import { BaseUrl } from "../utility/config";
import { getTokenHeaders } from "../helper/common";
const headers = { "Content-Type": "application/json" };

const loginUserApi = async (googleToken) => {
  return await axios.post(
    `${BaseUrl}/user/google-login`,
    {
      googleToken,
    },
    { headers }
  );
};

const getCurrentUserApi = async () => {
  return await axios.get(`${BaseUrl}/user/get-current-user`, {
    headers: getTokenHeaders(),
  });
};

const logoutUserApi = async () => {
  return await axios.post(
    `${BaseUrl}/user/logout`,
    {},
    {
      headers: getTokenHeaders(),
    }
  );
};

export { loginUserApi, getCurrentUserApi, logoutUserApi };
