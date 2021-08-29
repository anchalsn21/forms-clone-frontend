import axios from "axios";
import { BaseUrl } from "../utility/config";
import { getTokenHeaders } from "../helper/common";
const headers = { "Content-Type": "application/json" };

const addNewResponseApi = async (data) => {
  return await axios.post(`${BaseUrl}/response/add-new-response`, data, {
    headers,
  });
};

const getSingleResponseByIdApi = async (id) => {
  return await axios.get(`${BaseUrl}/response/${id}`, {
    headers: getTokenHeaders(),
  });
};

const getAllResponseByFormIdApi = async (formId) => {
  return await axios.get(`${BaseUrl}/response/get-all-response/${formId}`, {
    headers: getTokenHeaders(),
  });
};

export {
  addNewResponseApi,
  getSingleResponseByIdApi,
  getAllResponseByFormIdApi,
};
