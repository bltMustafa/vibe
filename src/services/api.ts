import axios from "axios";


const API_URL = 'http://127.0.0.1:7777';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/vibe/register", {email, password});
    return response.data;
  } catch (e) {
    console.error("Registration error", e);
    throw e;
  }
};

export const verifyOTP = async (email: string, otp: number) => {
  try {
    const response = await api.post("/vibe/verify", {email, otp});
    return response.data;
  } catch (e) {
    console.error("OTP verification error", e);
    throw e;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("vibe/login", {email, password});
    return response.data;
  } catch (e) {
    console.error("Login error", e);
    throw e;
  }
};

