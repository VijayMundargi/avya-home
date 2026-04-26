import axios from "./axios";

export const createPlot = (data) =>
  axios.post("/create-plot", data);

export const getPlots = (params) =>
  axios.get("/get-plot", { params });

export const getPlot = (id) =>
  axios.get(`/get-plot/${id}`);

export const updatePlot = (id, data) =>
  axios.put(`/update-plot/${id}`, data);

export const deletePlot = (id) =>
  axios.delete(`/delete-plot/${id}`);

export const updatePlotStatus = (id, status) =>
  axios.put(`/update-status/${id}/status`, { status });