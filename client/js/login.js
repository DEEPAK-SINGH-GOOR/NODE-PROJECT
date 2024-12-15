import userApi from "../api/user.api.js";
import getValue from "../components/input.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const handleSubmit = async (e) => {
  e.preventDefault();
  let user = {
    email: getValue("#email"),
    password: getValue("#password"),
  };
  if (!user.email || !user.password) {
    alert("Please enter all required fields");
    return;
  }
  const response = await userApi.login(user);
  if (response.token) {
    localStorage.setItem("token", response.token);
    window.location.href = "/dashboard.html";
  } else {
    alert("Login failed. Please try again.");
  }
};

document.getElementById("userDetails").addEventListener("submit", handleSubmit);
