const navbar = () => {
    let tag = ``;
    let { token } = Cookies.get();
    const decodedToken = token ? jwt_decode(token) : undefined;
  
    if (decodedToken) {
      tag = `
        <a class="nav-link" href="/profile.html">Profile</a>
        <a class="nav-link" id="logout">Logout</a>
      `;
    } else {
      tag = `<a class="nav-link" href="/login.html">Login</a>`;
    }
  
    return `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products.html">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/cart.html">Cart</a>
              </li>
              <li class="nav-item">${tag}</li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  };
  
  export default navbar;
  