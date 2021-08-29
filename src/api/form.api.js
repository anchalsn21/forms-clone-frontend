import axios from "axios";
import { BaseUrl } from "../utility/config";

import { getTokenHeaders } from "../helper/common";
const headers = { "Content-Type": "application/json" };

const addNewFormApi = async (data) => {
  return await axios.post(`${BaseUrl}/form/add-new-form`, data, {
    headers: getTokenHeaders(),
  });
};

const getSingleFormApi = async (formId) => {
  return axios.get(`${BaseUrl}/form/${formId}`, { headers });
};

const getAllFormsByUserIdApi = async () => {
  console.log(getTokenHeaders());
  return await axios.get(`${BaseUrl}/form/get-all-forms`, {
    headers: getTokenHeaders(),
  });
};

export { addNewFormApi, getSingleFormApi, getAllFormsByUserIdApi };
