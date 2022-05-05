import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BACK_END,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log(error);
    return Promise.reject();
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject();
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  },
);

export default service;
