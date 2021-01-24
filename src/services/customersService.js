import http from "./httpService";

export function getCustomers() {
  return http.get("/customers");
}

export function getCustomer(id) {
  return http.get(`/customers/${id}`);
}

export function saveCustomer(customer) {
  if (!customer._id) return http.post(`/customers`, customer);

  const sendCustomer = { ...customer };
  delete sendCustomer._id;

  return http.put(`/customers/${customer._id}`, sendCustomer);
}

export function deleteCustomer(id) {
  return http.delete(`/customers/${id}`);
}
