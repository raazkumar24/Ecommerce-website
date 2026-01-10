import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black">YourStore</h3>
            <p className="text-black/60 leading-relaxed">
              Your trusted destination for premium products at unbeatable
              prices. Fast delivery nationwide.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/home"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Products
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-black/70 hover:text-black hover:underline block transition">Categories</a>
              </li> */}
              <li>
                <a
                  href="/about"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="mailto:raazverma625@gmail.com?subject=Contact from Your Website&body=Hello Raaz,%0D%0A%0D%0AI am reaching out from your website.%0D%0A%0D%0ABest regards,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black/70 hover:text-black hover:underline block transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-6">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-black/60 flex-shrink-0" />
                <span className="text-black/70">+91 98765 XXXXX</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-black/60 flex-shrink-0" />
                <span className="text-black/70">hello@Estore.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-black/60 flex-shrink-0" />
                <span className="text-black/70">
                  123 Shopping Street, Chandigarh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 pt-8 mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-black/50">
            <p>&copy; 2026 YourStore. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-black transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-black transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
