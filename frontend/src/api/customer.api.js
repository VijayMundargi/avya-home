import axios from "axios";

const API = "http://localhost:5000/api";

export const createCustomerKYC = async (formData) => {
  return axios.post(`${API}/customer/kyc`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getCustomers = async () => {
  return axios.get(`${API}/customers`);
};


export const getCustomerById = async (id) => {
  return axios.get(`${API}/customers/${id}`);
};