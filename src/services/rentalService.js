import http from "./httpService";

export function getRentals() {
  return http.get("/rentals");
}

export function saveRental(rental) {
  return http.post(`/rentals`, rental);
}

export function returnRental(rental) {
  const send = { movieID: rental.movie._id, customerID: rental.customer._id };
  return http.post("/returns", send);
}
