import axios from "axios";

import authorizedAxios from "./authorizedAxios";

const UserApi = {
  getCurrentUser() {
    return authorizedAxios.get(`/api/user/me`);
  },
  userLogin(data) {
    return axios.post(`/api/user/signIn`, data);
  },
  userGoogleSignIn(token) {
    return axios.post("/api/user/signIn/google", { token: token });
  },
  userSignUp(data) {
    return axios.post("/api/user/signUp", data);
  },
  userGoogleSignUp(token) {
    return axios.post("/api/user/signUp/google", { token: token });
  },
  userLogout() {
    return authorizedAxios.get(`/api/user/logout`);
  },
};

export default UserApi;
