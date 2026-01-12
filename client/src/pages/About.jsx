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
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  Database,
  Server,
  Terminal
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Premium Products",
      description: "Curated selection of high-quality items"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "2-3 day shipping across India"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "100% safe & encrypted transactions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Always available to help you"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "30-day return policy"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pan India",
      description: "Serving customers nationwide"
    }
  ];

  const techStack = [
    { 
      name: "React", 
      color: "text-blue-500",
      icon: <div className="text-2xl">⚛️</div> // React icon
    },
    { 
      name: "Tailwind CSS", 
      color: "text-cyan-500",
      icon: <div className="text-2xl">🎨</div> // Design/color palette icon
    },
    { 
      name: "Node.js", 
      color: "text-green-500",
      icon: <div className="text-2xl">🟢</div> // Green circle for Node.js
    },
    { 
      name: "MongoDB", 
      color: "text-emerald-500",
      icon: <Database className="w-6 h-6" /> // Database icon
    },
    { 
      name: "Express", 
      color: "text-gray-600",
      icon: <Server className="w-6 h-6" /> // Server icon
    },
    { 
      name: "Vite", 
      color: "text-purple-500",
      icon: <Zap className="w-6 h-6" /> // Lightning bolt for Vite speed
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-full mb-8">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Made with Passion</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                E-Store
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              A modern e-commerce platform built by <span className="font-bold text-white">Raj Shekhar</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-xs sm:text-sm text-gray-300">Products</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">5K+</div>
                <div className="text-xs sm:text-sm text-gray-300">Customers</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">48H</div>
                <div className="text-xs sm:text-sm text-gray-300">Delivery</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-xs sm:text-sm text-gray-300">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Story Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-black mb-2">Raj Shekhar</h3>
                  <p className="text-gray-600 mb-3">Full-Stack Developer & Founder</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 text-black text-sm rounded-full">
                      <MapPin className="w-3 h-3" />
                      Chandigarh, India
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 text-black text-sm rounded-full">
                      <Code className="w-3 h-3" />
                      MERN Stack Expert
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  E-Store began as a personal project by <strong className="text-black">Raj Shekhar</strong>, 
                  a passionate developer from Chandigarh, India. What started as a quest to master 
                  full-stack development has evolved into a sophisticated e-commerce platform.
                </p>
                <p>
                  Built with <span className="font-bold text-blue-500">React</span> for the frontend and 
                  styled with <span className="font-bold text-cyan-500">Tailwind CSS</span>, this platform 
                  represents the perfect blend of modern technology and elegant design.
                </p>
                <div className="mt-8 p-6 bg-gradient-to-r from-black/5 to-black/10 rounded-2xl border-l-4 border-black">
                  <blockquote className="text-xl italic text-black font-semibold">
                    "The goal was to create a shopping experience that's fast, beautiful, and intuitive - 
                    powered by the best modern web technologies."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Powered by Modern Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge tools and frameworks for optimal performance
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="group bg-white border border-black/10 rounded-2xl p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className={`font-bold text-lg ${tech.color}`}>{tech.name}</h3>
              </div>
            ))}
          </div>

          {/* Tech Description */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">⚛️</div>
                <h3 className="text-xl font-bold text-blue-900">React</h3>
              </div>
              <p className="text-blue-800">
                The entire frontend is built with React, providing a fast, interactive, 
                and component-based user interface. React's virtual DOM ensures smooth 
                performance even with complex product listings and filters.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🎨</div>
                <h3 className="text-xl font-bold text-cyan-900">Tailwind CSS</h3>
              </div>
              <p className="text-cyan-800">
                All styling is done with Tailwind CSS, a utility-first framework that 
                enables rapid UI development. This makes the website fully responsive 
                and consistent across all devices and screen sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Why Choose E-Store
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white border border-black/10 rounded-2xl p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                To revolutionize online shopping by combining cutting-edge technology 
                with exceptional customer service, making premium products accessible to everyone.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Quality First</h4>
                    <p className="text-gray-400">Only premium products pass our quality checks</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Customer Focused</h4>
                    <p className="text-gray-400">Your satisfaction is our top priority</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Trust & Security</h4>
                    <p className="text-gray-400">100% secure and transparent transactions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-8">
              <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-black mb-4">Our Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">Innovation in every aspect of our platform</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">Transparency in pricing and policies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">Sustainability in our operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">Excellence in customer service</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-black/5 to-black/10 rounded-3xl p-8 border border-black/10">
                <h3 className="text-2xl font-bold text-black mb-4">Contact Developer</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:rajshekhar@example.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>rajshekhar@example.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <span>Chandigarh, India</span>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a href="#" className="p-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience Modern Shopping?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Built with <span className="font-bold">React</span> and <span className="font-bold">Tailwind CSS</span> for 
              the best possible user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="group bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Start Shopping</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;