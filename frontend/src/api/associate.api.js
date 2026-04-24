import api from "./axios";

export const getAssociates = () => api.get("/associate");

export const getAssociate = (id) => api.get(`/associate/${id}`);

export const createAssociate = (data) =>
  api.post("/associate", data);

export const updateAssociate = (id, data) =>
  api.put(`/associate/${id}`, data);

export const deleteAssociate = (id) =>
  api.delete(`/associate/${id}`);