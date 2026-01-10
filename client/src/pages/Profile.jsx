// import { useState } from "react";
// import api from "../services/api";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// const Profile = () => {
//   const { user, login } = useAuth();

//   const [form, setForm] = useState({
//     name: user?.name || "",
//     phone: user?.phone || "",
//     address: user?.address || "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await api.put("/auth/profile", form);
//       login(data); // update context + localStorage
//       toast.success("Profile updated");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">
//         Edit Profile
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           placeholder="Name"
//         />

//         <input
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           placeholder="Phone"
//         />

//         <textarea
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           placeholder="Address"
//         />

//         <button className="bg-black text-white px-4 py-2">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { User, Phone, MapPin, CheckCircle, Edit3 } from "lucide-react";

const Profile = () => {
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Profile</h2>
          <p className="text-black/60 mb-6">Please log in to view your profile.</p>
          <a href="/login" className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-colors">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">
            {form.name || "Your Profile"}
          </h1>
          <p className="text-xl text-black/60 mb-4">
            Manage your account information
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30"
          >
            {isEditing ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Profile Form */}
        <div className="bg-white border border-black/10 shadow-xl rounded-3xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-black">
                <User className="w-5 h-5" />
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-4 rounded-2xl border-2 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-black/10 ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-black/20"
                    : "border-black/10 bg-black/2 cursor-not-allowed"
                }`}
                placeholder="Enter your full name"
                required={isEditing}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-black">
                <Phone className="w-5 h-5" />
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-4 rounded-2xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-black/10 ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-black/20"
                    : "border-black/10 bg-black/2 cursor-not-allowed"
                }`}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Emial */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-black">
                <User className="w-5 h-5" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-4 rounded-2xl border-2 border-black/10 bg-black/2 text-lg cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-black">
                <MapPin className="w-5 h-5" />
                Address
              </label>
              <textarea
                name="address"
                rows={4}
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-4 rounded-2xl border-2 resize-vertical text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-black/10 ${
                  isEditing
                    ? "border-black/30 bg-white hover:border-black focus:border-black focus:ring-black/20"
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
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-300 ${
                  loading
                    ? "bg-black/50 text-black/50 cursor-not-allowed"
                    : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Update Profile
                  </>
                )}
              </button>
            )}
          </form>
        </div>

        {/* Profile Summary (Always Visible) */}
        <div className="mt-12 bg-black/5 border border-black/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
            Profile Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="text-black/70 mb-1">Name:</p>
              <p className="font-semibold text-black">{form.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-black/70 mb-1">Phone:</p>
              <p className="font-semibold text-black">{form.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-black/70 mb-1">Email:</p>
              <p className="font-semibold text-black">{user.email}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-black/70 mb-1">Address:</p>
              <p className="font-semibold text-black">{form.address || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
