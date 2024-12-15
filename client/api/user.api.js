import { getBaseUrl } from "./config/api.config.js";

const userApi = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${getBaseUrl()}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  },
  login: async (credentials) => {
    try {
      const response = await fetch(`${getBaseUrl()}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  },
};

export default userApi;
