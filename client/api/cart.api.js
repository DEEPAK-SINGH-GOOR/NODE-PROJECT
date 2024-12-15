import { getBaseUrl } from "./config/api.config.js";

const cartApi = {
  getByUserId: async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  },
  addToCart: async (data) => {
    try {
      const response = await fetch(`${getBaseUrl()}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
};

export default cartApi;
