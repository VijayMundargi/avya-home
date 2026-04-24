import api from "./axios";

export const loginUser = (data) => api.post("/login", data);
export const logoutUser = () => api.post("/logout");

export const forgotPassword = (data) =>
  api.post("/password/forgot", data);

export const resetPassword = (data) =>
  api.post("/password/reset", data);

export const changePassword = (data) =>
  api.post("/password/change", data);

export const getMe = () => api.get("/me");