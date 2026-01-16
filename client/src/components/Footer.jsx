import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ArrowUpRight,
  Globe,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* --- TOP BRANDING BAR --- */}
      <div className="bg-black py-10 lg:py-16 rounded-t-[3rem] lg:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
              <ShoppingBag className="text-black w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">B-Store</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
             <span className="flex items-center gap-2"><Globe size={14}/> Pan India</span>
             <span className="flex items-center gap-2"><ShieldCheck size={14}/> Secure Checkout</span>
             <span className="flex items-center gap-2">Premium Quality</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">About Our Vision</h4>
            <p className="text-gray-600 font-medium leading-relaxed">
              We architect premium shopping experiences by combining minimalist design with high-performance digital ecosystems.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 shadow-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-8">Navigation</h4>
            <ul className="space-y-4 font-bold text-sm">
              {["Home", "Products", "About"].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase()}`} className="flex items-center justify-between group hover:text-gray-500 transition-colors">
                    {link} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-8">Service</h4>
            <ul className="space-y-4 font-bold text-sm">
              {["Help Center", "Order Tracking", "Return Policy", "Privacy"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-500 transition-colors block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-8">Contact</h4>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-gray-600" />
                <a href="mailto:hello@estore.com" className="text-gray-600 hover:text-black transition-colors">hello@estore.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">+91 98765 XXXXX</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 leading-relaxed">
                  Chandigarh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            &copy; {currentYear} B-StoreL STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
             <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black">Terms</Link>
             <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black">Privacy</Link>
             <Link to="/cookies" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;