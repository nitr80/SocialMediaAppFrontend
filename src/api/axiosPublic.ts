import axios from "axios";
import { API_URL } from "../config/env";

const axiosPublic = axios.create({
  baseURL: API_URL,
});

export default axiosPublic;
