import axios from "./axios";

export const createPlot = (data) => axios.post("/plot", data);
export const getPlots = (params) => axios.get("/plot", { params });
export const getPlot = (id) => axios.get(`/plot/${id}`);
export const updatePlot = (id, data) => axios.put(`/plot/${id}`, data);
export const deletePlot = (id) => axios.delete(`/plot/${id}`);
export const updatePlotStatus = (id, status) =>
  axios.put(`/plot/${id}/status`, { status });

export const exportPlots = () =>
  axios.get("/plot/export/all", { responseType: "blob" });