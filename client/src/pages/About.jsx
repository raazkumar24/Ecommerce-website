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
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Premium Products",
      description: "Curated selection of high-quality items",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "2-3 day shipping across India",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "100% safe & encrypted transactions",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Always available to help you",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "30-day return policy",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Pan India",
      description: "Serving customers nationwide",
    },
  ];

  const techStack = [
    {
      name: "React",
      color: "text-blue-500",
      icon: (
        <div className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >
            <path
              fill="#00bcd4"
              d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4s-12-2.59-12-4s4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6s14-2.686 14-6s-6.268-6-14-6"
            ></path>
            <path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2"></path>
            <path
              fill="#00bcd4"
              d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493c3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124c-3.284-5.69-7.72-9.493-10.74-9.493Z"
            ></path>
            <path
              fill="#00bcd4"
              d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393c-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"
            ></path>
          </svg>
        </div>
      ), // React icon
    },
    {
      name: "Tailwind CSS",
      color: "text-cyan-500",
      icon: (
        <div className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >
            <path
              fill="#44a8b3"
              d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1m-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1q-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      name: "Node.js",
      color: "text-green-500",
      icon: (
        <div className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >
            <path
              fill="#8bc34a"
              d="M16 20.003v2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2v-2h4v-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2Z"
            ></path>
            <path
              fill="#8bc34a"
              d="m16 3.003l-12 7v14l4 2h6v-13.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v11.5H8l-2-1.034V11.15l10-5.833l10 5.833v11.703l-10 5.833l-1.745-1.022L13 29.253l3 1.75l12-7v-14Z"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      name: "MongoDB",
      color: "text-emerald-500",
      icon: <Database className="w-6 h-6" color="green" />,
    },
    {
      name: "Express",
      color: "text-gray-600",
      icon: <Server className="w-6 h-6" color="blue" />,
    },
    {
      name: "Vite",
      color: "text-purple-500",
      icon: (
        <div className="text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >
            <g fill="none">
              <path
                fill="url(#SVGHszO3cqp)"
                d="m29.884 6.146l-13.142 23.5a.714.714 0 0 1-1.244.005L2.096 6.148a.714.714 0 0 1 .746-1.057l13.156 2.352a.7.7 0 0 0 .253 0l12.881-2.348a.714.714 0 0 1 .752 1.05z"
              ></path>
              <path
                fill="url(#SVGzrK2gcXq)"
                d="M22.264 2.007L12.54 3.912a.36.36 0 0 0-.288.33l-.598 10.104a.357.357 0 0 0 .437.369l2.707-.625a.357.357 0 0 1 .43.42l-.804 3.939a.357.357 0 0 0 .454.413l1.672-.508a.357.357 0 0 1 .454.414l-1.279 6.187c-.08.387.435.598.65.267l.143-.222l7.925-15.815a.357.357 0 0 0-.387-.51l-2.787.537a.357.357 0 0 1-.41-.45l1.818-6.306a.357.357 0 0 0-.412-.45"
              ></path>
              <defs>
                <linearGradient
                  id="SVGHszO3cqp"
                  x1={6}
                  x2={235}
                  y1={33}
                  y2={344}
                  gradientTransform="translate(1.34 1.894)scale(.07142)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#41d1ff"></stop>
                  <stop offset={1} stopColor="#bd34fe"></stop>
                </linearGradient>
                <linearGradient
                  id="SVGzrK2gcXq"
                  x1={194.651}
                  x2={236.076}
                  y1={8.818}
                  y2={292.989}
                  gradientTransform="translate(1.34 1.894)scale(.07142)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffea83"></stop>
                  <stop offset={0.083} stopColor="#ffdd35"></stop>
                  <stop offset={1} stopColor="#ffa800"></stop>
                </linearGradient>
              </defs>
            </g>
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-gray-800 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
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
              <span className="block bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome to
              </span>
              <span className="block bg-linear-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                E-Store
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              A modern e-commerce platform built by{" "}
              <span className="font-bold text-white">Raj Shekhar</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-300">Products</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  5K+
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Customers
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  48H
                </div>
                <div className="text-xs sm:text-sm text-gray-300">Delivery</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  100%
                </div>
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
              <div className="w-24 h-1 bg-linear-to-r from-black to-gray-400 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-linear-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Raj Shekhar
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Full-Stack Developer & Founder
                  </p>
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
                  E-Store began as a personal project by{" "}
                  <strong className="text-black">Raj Shekhar</strong>, a
                  passionate developer from Chandigarh, India. What started as a
                  quest to master full-stack development has evolved into a
                  sophisticated e-commerce platform.
                </p>
                <p>
                  Built with{" "}
                  <span className="font-bold text-blue-500">React</span> for the
                  frontend and styled with{" "}
                  <span className="font-bold text-cyan-500">Tailwind CSS</span>,
                  this platform represents the perfect blend of modern
                  technology and elegant design.
                </p>
                <div className="mt-8 p-6 bg-linear-to-r from-black/5 to-black/10 rounded-2xl border-l-4 border-black">
                  <blockquote className="text-xl italic text-black font-semibold">
                    "The goal was to create a shopping experience that's fast,
                    beautiful, and intuitive - powered by the best modern web
                    technologies."
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
              Built with cutting-edge tools and frameworks for optimal
              performance
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group bg-white border border-black/10 rounded-2xl p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-br from-gray-100 to-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className={`font-bold text-lg ${tech.color}`}>
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Tech Description */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">⚛️</div>
                <h3 className="text-xl font-bold text-blue-900">React</h3>
              </div>
              <p className="text-blue-800">
                The entire frontend is built with React, providing a fast,
                interactive, and component-based user interface. React's virtual
                DOM ensures smooth performance even with complex product
                listings and filters.
              </p>
            </div>

            <div className="bg-linear-to-r from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🎨</div>
                <h3 className="text-xl font-bold text-cyan-900">
                  Tailwind CSS
                </h3>
              </div>
              <p className="text-cyan-800">
                All styling is done with Tailwind CSS, a utility-first framework
                that enables rapid UI development. This makes the website fully
                responsive and consistent across all devices and screen sizes.
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
                <div className="w-14 h-14 bg-linear-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Mission */}
            <div className="bg-linear-to-br from-black to-gray-900 rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                To revolutionize online shopping by combining cutting-edge
                technology with exceptional customer service, making premium
                products accessible to everyone.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Quality First</h4>
                    <p className="text-gray-400">
                      Only premium products pass our quality checks
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Customer Focused</h4>
                    <p className="text-gray-400">
                      Your satisfaction is our top priority
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Trust & Security</h4>
                    <p className="text-gray-400">
                      100% secure and transparent transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-8">
              <div className="bg-white border border-black/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Our Values
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Innovation in every aspect of our platform
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Transparency in pricing and policies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Sustainability in our operations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      Excellence in customer service
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-r from-black/5 to-black/10 rounded-3xl p-8 border border-black/10">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Contact Developer
                </h3>
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
                    <a
                      href="#"
                      className="p-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>

                    {/* Xtwitter icon not available in lucide-react, using custom SVG */}
                    <a
                      href="#"
                      className="p-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
                    >
                      <div className="w-5 h-5 items-center justify-center flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                        >
                          <g fill="none">
                            <g clipPath="url(#SVGG1Ot4cAD)">
                              <path
                                fill="currentColor"
                                d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="SVGG1Ot4cAD">
                                <path fill="#fff" d="M0 0h14v14H0z"></path>
                              </clipPath>
                            </defs>
                          </g>
                        </svg>
                      </div>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-linear-to-r from-black to-gray-900 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience Modern Shopping?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Built with <span className="font-bold">React</span> and{" "}
              <span className="font-bold">Tailwind CSS</span> for the best
              possible user experience.
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
