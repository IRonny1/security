import {
  deleteFromStorage,
  useLocalStorage,
  writeStorage,
} from "@rehooks/local-storage";

const JWT_TOKEN = "jwt_token";

export function getJwtToken() {
  return localStorage.getItem(JWT_TOKEN);
}

export function setJwtToken(token) {
  return writeStorage(JWT_TOKEN, token);
}

export function removeJwtToken() {
  return deleteFromStorage(JWT_TOKEN);
}

export function useJwtToken() {
  return useLocalStorage(JWT_TOKEN);
}
