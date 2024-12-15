import { getBaseUrl } from "./config/api.config.js";

const productApi = {
  get: async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/products`, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  post: async (formData) => {
    try {
      const response = await fetch(`${getBaseUrl()}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error posting product:", error);
    }
  },
};

export default productApi;
