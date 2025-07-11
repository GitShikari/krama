import axios from 'axios';

const API = axios.create({ baseURL: 'https://krama-back.onrender.com/api' });

export const fetchRecent = (type = 'drama') => API.get(`/recent?type=${type}`);
export const searchContent = (q) => API.get(`/search?q=${q}`);
export const getDramaDetails = (slug) => API.get(`/drama/series/${slug}`);
export const getWatchData = (slug) => API.get(`/watch/${slug}`);
