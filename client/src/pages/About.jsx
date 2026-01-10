import { 
  User, 
  Package, 
  Truck, 
  Shield, 
  Award, 
  Users,
  Mail 
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-black/5 to-transparent py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent mb-6">
            About E-Store
          </h1>
          <p className="text-xl md:text-2xl text-black/80 max-w-2xl mx-auto leading-relaxed">
            Built with passion by <span className="font-bold text-black">Raj Shekhar</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Story */}
        <section className="text-center mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Our Story
            </h2>
            <p className="text-lg text-black/70 leading-relaxed mb-8">
              E-Store was founded by <strong>Raj Shekhar</strong>, a passionate web developer 
              from Chandigarh, India. What started as a personal project to master full-stack 
              development has grown into a premium e-commerce platform serving thousands 
              of customers across India.
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              With a focus on modern UI/UX, lightning-fast performance, and seamless shopping 
              experience, E-Store combines cutting-edge technology with genuine customer care.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 text-center">
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <Package className="w-16 h-16 text-black mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">10K+</div>
            <div className="text-black/60 font-semibold">Products</div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <Users className="w-16 h-16 text-black mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">5K+</div>
            <div className="text-black/60 font-semibold">Happy Customers</div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <Truck className="w-16 h-16 text-black mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">48H</div>
            <div className="text-black/60 font-semibold">Fast Delivery</div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <Shield className="w-16 h-16 text-black mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">100%</div>
            <div className="text-black/60 font-semibold">Secure</div>
          </div>
        </section>

        {/* Creator */}
        <section className="bg-gradient-to-r from-black/5 to-black/5 rounded-3xl p-12 lg:p-16 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-black/20 mb-8">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Raj Shekhar</h3>
                <p className="text-black/60 text-sm">Founder & Full-Stack Developer</p>
              </div>
            </div>
            <blockquote className="text-xl lg:text-2xl text-black/80 italic font-semibold max-w-2xl mx-auto leading-relaxed">
              "Building E-Store was my dream to create a modern, fast, and beautiful 
              shopping experience using React, Tailwind CSS, and cutting-edge web technologies."
            </blockquote>
          </div>
        </section>

        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-lg text-black/70">
              <p>
                To provide the best online shopping experience with premium products, 
                competitive prices, and exceptional customer service.
              </p>
              <p>
                Empowering customers with choice, convenience, and confidence in every purchase.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-black" />
                  <span>Premium Quality Guaranteed</span>
                </li>
                <li className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-black" />
                  <span>Fast & Reliable Delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-black" />
                  <span>100% Secure Shopping</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white border border-black/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
              <img 
                src="/api/placeholder/400/300" 
                alt="E-Store Team" 
                className="w-full h-64 lg:h-80 object-cover rounded-2xl"
              />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-2xl border border-black/20 font-semibold text-black">
                Made in Chandigarh, India
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-24 pt-16 border-t border-black/10">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
            Ready to Shop?
          </h2>
          <p className="text-xl text-black/70 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers already shopping at E-Store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-black text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-black/40 hover:scale-105 transition-all duration-300"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-black text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-black hover:text-white shadow-2xl hover:shadow-black/40 hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
