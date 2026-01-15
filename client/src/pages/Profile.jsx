import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { 
  User, Phone, MapPin, CheckCircle, Edit3, 
  Mail, ArrowLeft, Shield, Camera, Settings, 
  X, Package, Loader2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      // Set initial preview if user already has an image
      setPreviewImage(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- IMAGE UPLOAD LOGIC ---
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Client-side Validation
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be less than 2MB");
    }

    // 2. Show Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // 3. Upload to Server
    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      // Assuming your backend route is /auth/avatar
      const { data } = await api.put("/auth/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      login(data); // Update AuthContext with new user data (including new avatar URL)
      toast.success("Avatar updated!");
    } catch (error) {
      toast.error("Failed to upload image");
      setPreviewImage(user.avatar); // Revert on failure
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put("/auth/profile", form);
      login(data);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // Or your access denied UI

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased pb-20">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6 md:hidden">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ArrowLeft size={20} /></button>
        <span className="ml-4 font-black uppercase text-xs tracking-widest">Account Settings</span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              {/* Profile Image / Initials Container */}
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-black rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl overflow-hidden border-4 border-white">
                {previewImage ? (
                  <img src={previewImage} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0)
                )}
                
                {/* Upload Overlay */}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Camera Icon Button */}
              <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-gray-50 hover:bg-gray-50 transition-all text-black">
                <Camera size={18} />
              </button>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
                {form.name || "User"}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1 font-medium">
                <Shield size={14} className="text-emerald-500" />
                <span className="text-xs uppercase tracking-widest font-bold">Verified Member</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl ${
              isEditing ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white" : "bg-black text-white hover:bg-zinc-800"
            }`}
          >
            {isEditing ? <><X size={14} /> Cancel</> : <><Edit3 size={14} /> Edit Profile</>}
          </button>
        </header>

        {/* ... Rest of your existing Profile Form and Summary logic remains the same ... */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-[2.8rem] p-8 lg:p-10 border border-gray-50 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-3">
                        <Settings size={14} /> Personal Information
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input name="name" value={form.name} onChange={handleChange} disabled={!isEditing} className={`w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none transition-all font-bold ${isEditing ? "focus:ring-2 ring-black/5 bg-white shadow-inner" : "opacity-60"}`} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Account Email</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input value={user.email} disabled className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl font-bold opacity-40 cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input name="phone" value={form.phone} onChange={handleChange} disabled={!isEditing} className={`w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none transition-all font-bold ${isEditing ? "focus:ring-2 ring-black/5 bg-white shadow-inner" : "opacity-60"}`} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Member ID</label>
                                <div className="bg-gray-50 py-5 px-6 rounded-3xl font-mono text-xs font-bold text-gray-600">ID_{user._id?.slice(-8).toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Shipping Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-5 top-8 text-gray-500" size={18} />
                                <textarea name="address" value={form.address} onChange={handleChange} disabled={!isEditing} rows={4} className={`w-full bg-gray-50 border-none py-6 pl-14 pr-6 rounded-3xl outline-none transition-all font-bold resize-none ${isEditing ? "focus:ring-2 ring-black/5 bg-white shadow-inner" : "opacity-60"}`} />
                            </div>
                        </div>

                        {isEditing && (
                            <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle size={18} /> Save Settings</>}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="bg-black text-white rounded-[2.8rem] p-8 shadow-2xl relative overflow-hidden">
                    <Package className="absolute -bottom-10 -right-10 w-40 h-40 text-white/10 -rotate-12" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black tracking-tighter uppercase mb-6">Status Overview</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Phone</p>
                                <p className="font-bold">{form.phone || "Not Set"}</p>
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Default Location</p>
                                <p className="font-bold text-sm leading-relaxed line-clamp-2">{form.address || "No address added yet"}</p>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                                    <span className="text-white/40">Account Tier</span>
                                    <span>Premium Member</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;