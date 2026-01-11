import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { User, Phone, MapPin, CheckCircle, Edit3, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.put("/auth/profile", form);
      login(data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-black/5 rounded-2xl flex items-center justify-center">
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-black/30" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">Profile</h2>
          <p className="text-black/60 mb-6 text-sm sm:text-base">
            Please log in to view your profile.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Mobile Back Button */}
        {isMobile && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center">
            <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
            {form.name || "Your Profile"}
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-black/60 mb-4 sm:mb-6">
            Manage your account information
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 ${
              isEditing
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-black hover:bg-black/90 text-white"
            } shadow-lg hover:shadow-black/30 w-full sm:w-auto`}
          >
            {isEditing ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm sm:text-base">Save Changes</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span className="text-sm sm:text-base">Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Form */}
        <div className="bg-white border border-black/10 shadow-lg sm:shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name */}
            <div className="space-y-1 sm:space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 text-base sm:text-lg font-semibold transition-all duration-200 focus:outline-none ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/20"
                    : "border-black/10 bg-black/2 cursor-not-allowed"
                }`}
                placeholder="Enter your full name"
                required={isEditing}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1 sm:space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 text-base sm:text-lg transition-all duration-200 focus:outline-none ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/20"
                    : "border-black/10 bg-black/2 cursor-not-allowed"
                }`}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email */}
            <div className="space-y-1 sm:space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-black/10 bg-black/2 text-base sm:text-lg cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 sm:space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 resize-vertical text-base sm:text-lg transition-all duration-200 focus:outline-none ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/20"
                    : "border-black/10 bg-black/2 cursor-not-allowed"
                }`}
                placeholder="Enter your full address"
              />
            </div>

            {/* Submit Button */}
            {isEditing && (
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 ${
                  loading
                    ? "bg-black/50 text-black/50 cursor-not-allowed"
                    : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    <span className="text-sm sm:text-base">Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Update Profile</span>
                  </>
                )}
              </button>
            )}
          </form>
        </div>

        {/* Profile Summary */}
        <div className="bg-black/5 border border-black/10 rounded-2xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            Profile Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg">
            <div>
              <p className="text-black/70 mb-1 text-xs sm:text-sm">Name:</p>
              <p className="font-semibold text-black">{form.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-black/70 mb-1 text-xs sm:text-sm">Phone:</p>
              <p className="font-semibold text-black">{form.phone || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-black/70 mb-1 text-xs sm:text-sm">Email:</p>
              <p className="font-semibold text-black break-all">{user.email}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-black/70 mb-1 text-xs sm:text-sm">Address:</p>
              <p className="font-semibold text-black whitespace-pre-wrap">{form.address || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Additional Info - Mobile Only */}
        {isMobile && (
          <div className="mt-6 text-center text-xs text-black/50">
            <p>Tap "Edit Profile" to update your information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;