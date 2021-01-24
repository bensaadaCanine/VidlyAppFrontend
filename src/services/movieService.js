import http from "./httpService";

export function getMovies() {
  return http.get("/movies");
}

export function getMovie(id) {
  return http.get(`/movies/${id}`);
}

export function saveMovie(movie) {
  if (!movie._id) return http.post(`/movies`, movie);

  const sendMovie = { ...movie };
  delete sendMovie._id;

  return http.put(`/movies/${movie._id}`, sendMovie);
}

export function deleteMovie(id) {
  return http.delete(`/movies/${id}`);
}
