import navbar from "../components/navbar.js";
import Cookies from "js-cookie"; 

document.getElementById("navbar").innerHTML = navbar();

let { isVerified } = Cookies.get();

if (isVerified === "false") {
  document.getElementById("alert").innerHTML = `
    <div class="alert alert-warning" role="alert">
      Please verify your email address.
    </div>
  `;
}
