import http from "./httpService";

export function newUser(user) {
  return http.post(`/users`, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
