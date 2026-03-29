import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getEntries = userId =>
  axios.get(`${API}/journal/${userId}`);

export const getAllEntries = () =>
  axios.get(`${API}/journal/all`);

export const saveEntry = data =>
  axios.post(`${API}/journal`, data);

export const analyzeEntry = text =>
  axios.post(`${API}/journal/analyze`, { text });

export const getInsights = () =>
  axios.get(`${API}/journal/insights`);

