import axios from "axios";

import { getJwtToken, removeJwtToken } from "../services/jwtTokenService";

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getJwtToken()}`;

    return config;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      removeJwtToken();
    }
  }
);

export default authorizedAxios;
