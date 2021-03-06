import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-gbertl.herokuapp.com'
    : 'http://localhost:3001';

export const axiosPrivate = axios.create({
  baseURL,
});

axiosPrivate.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('accessToken')}`;

export default axios.create({
  baseURL,
});
