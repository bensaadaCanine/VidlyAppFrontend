import http from "./httpService";

export function getGenres() {
  return http.get("/genres");
}

export function saveGenre(genre) {
  return http.post("/genres", genre);
}

export function deleteGenre(id) {
  return http.delete("/genres/" + id);
}
