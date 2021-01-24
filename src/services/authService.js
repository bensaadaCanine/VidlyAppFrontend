import http from "./httpService";
import jwt_decode from "jwt-decode";

const tokenKey = "token";

http.setJWT(localStorage.getItem(tokenKey));

export async function login(user) {
  const { data: jwt } = await http.post(`/auth`, {
    email: user.username,
    password: user.password,
  });

  window.localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  window.localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = window.localStorage.getItem(tokenKey);
    const user = jwt_decode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function isUserAdmin() {
  const user = getCurrentUser();

  return user ? user.isAdmin : false;
}
