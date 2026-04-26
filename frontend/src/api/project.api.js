import api from "./axios";

// CREATE
export const createProject = (data) =>
  api.post("/project", data);

// GET ALL
export const getProjects = () =>
  api.get("/project");

// GET ONE
export const getProject = (id) =>
  api.get(`/project/${id}`);

// UPDATE
export const updateProject = (id, data) =>
  api.put(`/project/${id}`, data);

// DELETE
export const deleteProject = (id) =>
  api.delete(`/project/${id}`);