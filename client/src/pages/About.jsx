import {
  User,
  Package,
  Truck,
  Shield,
  Award,
  Users,
  Mail,
  Globe,
  Clock,
  Heart,
  Star,
  Code,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  Database,
  Server,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Package className="w-5 h-5" />,
      title: "Premium Products",
      description: "Curated selection of high-quality items",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Fast Delivery",
      description: "2-3 day shipping across India",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Shopping",
      description: "100% safe & encrypted transactions",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Always available to help you",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Guarantee",
      description: "30-day return policy",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Pan India",
      description: "Serving customers nationwide",
    },
  ];

  const techStack = [
    { name: "React", icon: <Code className="w-6 h-6" /> },
    { name: "Tailwind", icon: <Zap className="w-6 h-6" /> },
    { name: "Node.js", icon: <Server className="w-6 h-6" /> },
    { name: "MongoDB", icon: <Database className="w-6 h-6" /> },
    { name: "Express", icon: <Layers className="w-6 h-6" /> },
    { name: "Vite", icon: <Star className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-black py-24 sm:py-32 px-6 lg:px-8 rounded-b-[4rem] lg:rounded-b-[6rem]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-125 h-125 bg-white/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full mb-8 backdrop-blur-md">
            <Heart className="w-4 h-4 fill-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Established 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none uppercase mb-8">
            The New <br />
            <span className="text-zinc-600">Standard.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            A minimalist e-commerce ecosystem architected for performance, 
            built with precision, and designed by <span className="text-white underline decoration-zinc-700 underline-offset-8">Raj Shekhar</span>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[["10k+", "Inventory"], ["5k+", "Clients"], ["48h", "Shipping"], ["100%", "Safe"]].map(([val, label]) => (
              <div key={label} className="p-6 rounded-4xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-2xl font-black text-white">{val}</p>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUNDER SECTION ================= */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3.5rem] p-8 lg:p-16 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/3">
              <div className="relative group">
                <div className="aspect-square bg-black rounded-[3rem] flex items-center justify-center shadow-2xl overflow-hidden">
                  <User className="w-32 h-32 text-white opacity-20 absolute -bottom-4 -right-4" />
                  <div className="relative text-white text-9xl font-black italic select-none">RS</div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 hidden md:block">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-600 mb-1">Founder</p>
                  <p className="font-bold text-lg">Raj Shekhar</p>
                </div>
              </div>
            </div>

            <div className="lg:flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">The Visionary <br/>Behind the Store.</h2>
                <div className="w-20 h-1.5 bg-black rounded-full" />
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                <p>
                  E-Store began as a quest to redefine modern shopping. What started in 
                  <span className="text-black font-bold"> Chandigarh, India</span> as a technical challenge 
                  has evolved into a sophisticated platform focused on the intersection of utility and design.
                </p>
                <p>
                  Built on the <span className="text-black font-bold">MERN Stack</span>, every line of code 
                  is optimized for a seamless user experience. We don't just sell products; we provide 
                  a high-performance digital gateway to the best hardware on the market.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <MapPin size={16} className="text-gray-600" />
                  <span className="text-xs font-bold uppercase tracking-widest">Chandigarh, IN</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <Code size={16} className="text-gray-600" />
                  <span className="text-xs font-bold uppercase tracking-widest">Lead Architect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="py-24 bg-black text-white rounded-[4rem] lg:rounded-[6rem] mx-6">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">The Stack</span>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">Forged with Power.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="group bg-white/5 border border-white/10 rounded-4xl p-8 text-center hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-2">
                <div className="mb-4 flex justify-center">{tech.icon}</div>
                <h3 className="font-bold text-sm uppercase tracking-widest">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/10 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-[#F5F5F7] rounded-[4rem] p-12 lg:p-24 text-center">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
            Ready to <br/>Start?
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto font-medium">
            Join thousands of users experiencing the future of minimalist retail. 
            Built for speed, secured for peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3">
              Browse Collection <ArrowRight size={16} />
            </Link>
            <div className="flex gap-4 justify-center">
              <a href="#" className="w-14 h-14 bg-white rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                <Github size={20} />
              </a>
              <a href="#" className="w-14 h-14 bg-white rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

// Utility for missing Lucide icon in map
function Layers(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m2.6 12.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83"/><path d="m2.6 17.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83"/></svg>
  )
}