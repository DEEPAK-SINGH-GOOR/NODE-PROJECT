import { getBaseUrl } from "../config/api.config.js";

const superAdminApi = {
  getAdmins: async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/user/all-admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  },
};

export default superAdminApi;
