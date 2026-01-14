import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  KeyRound, 
  UserPlus, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
      const { data } = await api.post("/auth/register", form);
      login(data);
      toast.success("Profile Created Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 py-12">
      <div className="w-full max-w-[480px]">
        {/* Branding Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-[2rem] flex items-center justify-center shadow-2xl shadow-black/20 animate-in zoom-in duration-700">
            <UserPlus className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[3rem] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 italic">
              Join E-Store
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Create New Identity
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 border-none py-4 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border-none py-4 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                Mobile Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 00000 00000"
                  className="w-full bg-gray-50 border-none py-4 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                Access Password
              </label>
              <div className="relative group">
                <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  className="w-full bg-gray-50 border-none py-4 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-sm"
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-black text-white py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-black/20 hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register Account <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <footer className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              Already a member?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-black hover:underline underline-offset-4 decoration-2"
              >
                Authorize
              </button>
            </p>
          </footer>
        </div>

        {/* Security Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <ShieldCheck size={14} />
          <p className="text-center text-[10px] font-bold uppercase tracking-widest">
            Identity Encrypted Connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;