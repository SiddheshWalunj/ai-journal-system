<<<<<<< HEAD
import axios from "axios";

const API = process.env.REACT_APP_API_URL ;

export const getEntries = userId =>
  axios.get(`${API}/journal/${userId}`);

export const saveEntry = data =>
  axios.post(`${API}/journal`, data);

export const analyzeEntry = text =>
  axios.post(`${API}/journal/analyze`, { text });

export const getInsights = userId =>
  axios.get(`${API}/journal/insights/${userId}`);
=======
import axios from "axios";

const API = process.env.REACT_APP_API_URL ;

export const getEntries = userId =>
  axios.get(`${API}/journal/${userId}`);

export const saveEntry = data =>
  axios.post(`${API}/journal`, data);

export const analyzeEntry = text =>
  axios.post(`${API}/journal/analyze`, { text });

export const getInsights = userId =>
  axios.get(`${API}/journal/insights/${userId}`);
>>>>>>> 82864438c9d7d33b4bac508629d7c9e945d7e060
