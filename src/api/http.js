import axios from "axios";

export const http = axios.create({
  baseURL: "https://contact-app-shahbaj.netlify.app/",
  headers: { "Content-Type": "application/json" }
});
