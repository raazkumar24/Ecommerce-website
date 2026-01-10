import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import EditProduct from "../pages/admin/EditProduct";
import Profile from "../pages/Profile";
import Products from "../pages/Products";
import Dashboard from "../pages/admin/Dashboard";
import AddProduct from "../pages/admin/AddProduct";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import About from "../pages/About";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />

      {/* User Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
