import axios from "axios";

import authorizedAxios from "./authorizedAxios";

const UserApi = {
  getCurrentUser() {
    return authorizedAxios.get(`/api/user/me`);
  },
  userLogin(data) {
    return axios.post(`/api/user/signIn`, data);
  },
  userLogout() {
    return authorizedAxios.get(`/api/user/logout`);
  },
  userSignUp(data) {
    return axios.post("/api/user/signUp", data);
  },
};

export default UserApi;
