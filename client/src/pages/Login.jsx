import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      toast.success("Login successful");

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-black text-center mb-2 tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-black/60 text-center mb-6">
          Log in to access your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-black/20 bg-white px-3 py-2.5 text-sm text-black placeholder-black/40 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-black/20 bg-white px-3 py-2.5 text-sm text-black placeholder-black/40 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-black/60">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-black underline-offset-4 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

