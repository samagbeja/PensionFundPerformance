import axios from "axios";
const fetchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: { "Content-Type": "application/json" },
});
export default fetchApi;
