// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://ecommerce-website-2hug.onrender.com/api",
// });

// // Attach token automatically
// api.interceptors.request.use((req) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.token) {
//     req.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return req;
// });

// // PRODUCTS
// export const getProducts = (query = "") =>
//   api.get(`/products${query}`);

// export const getSingleProduct = (id) =>
//   api.get(`/products/${id}`);

// // CART
// export const addToCartApi = (data) =>
//   api.post("/cart/add", data);

// // CART
// export const getCartApi = () => api.get("/cart");

// export const updateCartApi = (data) =>
//   api.put("/cart/update", data);

// export const removeCartItemApi = (productId) =>
//   api.delete(`/cart/remove/${productId}`);




// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-website-2hug.onrender.com/api",
});

// Attach token automatically
api.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// PRODUCTS
export const getProducts = (query = "") =>
  api.get(`/products${query}`);

export const getAllProducts = () =>
  api.get("/products");

export const getSingleProduct = (id) =>
  api.get(`/products/${id}`);

// CART
export const addToCartApi = (data) =>
  api.post("/cart/add", data);

export const getCartApi = () => api.get("/cart");

export const updateCartApi = (data) =>
  api.put("/cart/update", data);

export const removeCartItemApi = (productId) =>
  api.delete(`/cart/remove/${productId}`);

export default api;