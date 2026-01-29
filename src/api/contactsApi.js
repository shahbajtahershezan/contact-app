import { http } from "./http";

export const contactsApi = {
  list: () => http.get("/contacts"),
  create: (payload) => http.post("/contacts", payload),
  update: (id, payload) => http.patch(`/contacts/${id}`, payload),
  remove: (id) => http.delete(`/contacts/${id}`)
};
