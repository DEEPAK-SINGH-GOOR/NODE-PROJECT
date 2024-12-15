import productApi from "../../api/product.api.js";

const handleAddProduct = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const img = document.getElementById("img").files[0];
  const formData = new FormData();

  formData.append("title", title);
  formData.append("price", price);
  formData.append("img", img);

  const response = await productApi.post(formData);
  if (response) {
    alert("Product added successfully!");
  }
};

document.getElementById("addProductForm").addEventListener("submit", handleAddProduct);
