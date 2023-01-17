import axios from "axios";

import {
  getJwtToken,
  removeJwtToken,
  setJwtToken,
} from "../services/jwtTokenService";

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getJwtToken()}`;

  return config;
});

authorizedAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err.response.status === 401) {
      try {
        axios.post("/api/user/refresh").then((res) => {
          setJwtToken(res.data.accessToken);
          return axios.request(err.config);
        });
      } catch (e) {
        removeJwtToken();
      }
    }
  }
);

export default authorizedAxios;
