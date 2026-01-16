import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      toast.success("Identity Verified");

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="w-full max-w-110">
        {/* Logo/Icon Branding */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-4xl flex items-center justify-center shadow-2xl shadow-black/20">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[3rem] p-8 md:p-12">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 italic">
              B-Store
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Identity Gateway
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                Access Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                  Secret Key
                </label>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-black text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-black/20 hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-b-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <footer className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              New to the ecosystem?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-black hover:underline underline-offset-4 decoration-2"
              >
                Create Account
              </button>
            </p>
          </footer>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Secure Terminal v2.0.4
        </p>
      </div>
    </div>
  );
};

export default Login;