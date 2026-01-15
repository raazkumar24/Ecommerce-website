import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { 
  ChevronLeft, ShoppingCart, Check, ChevronRight, ChevronUp,
  Maximize2, Star, Truck, Shield, RefreshCw,
  Heart, Share2, ArrowLeft, Package, ZoomIn
} from "lucide-react";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, loading } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandDescription, setExpandDescription] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  // Swipe State
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Zoom State (Desktop)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imageTrackRef = useRef(null);
  const imageContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProduct = useCallback(async () => {
    setLoadingProduct(true);
    try {
      const { data } = await getSingleProduct(id);
      setProduct(data);
    } catch (error) {
      toast.error("Product not found");
      navigate("/");
    } finally {
      setLoadingProduct(false);
    }
  }, [id, navigate]);

  const checkIsInCart = useCallback(() => {
    if (!cart || !product) {
      setIsInCart(false);
      return;
    }
    const exists = cart.products.some((item) => item.product._id === product._id);
    setIsInCart(exists);
  }, [cart, product]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);
  useEffect(() => { checkIsInCart(); }, [checkIsInCart]);

  // --- Image Navigation ---
  const nextImage = () => {
    if (product?.images) {
      const nextIndex = (activeImg + 1) % product.images.length;
      setActiveImg(nextIndex);
      scrollThumbnailIntoView(nextIndex);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      const prevIndex = (activeImg - 1 + product.images.length) % product.images.length;
      setActiveImg(prevIndex);
      scrollThumbnailIntoView(prevIndex);
    }
  };

  const scrollThumbnailIntoView = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnailElement = thumbnailContainerRef.current.children[index];
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // --- Touch & Mouse Swipe Engine ---
  const handleDragStart = (clientX) => {
    setTouchStart(clientX);
    setIsSwiping(true);
    if (imageTrackRef.current) imageTrackRef.current.style.transition = 'none';
  };

  const handleDragMove = (clientX) => {
    if (!isSwiping) return;
    setTouchEnd(clientX);
    const diff = touchStart - clientX;
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
    }
  };

  const handleDragEnd = () => {
    if (!isSwiping) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    setIsSwiping(false);
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
      imageTrackRef.current.style.transform = `translateX(-${activeImg * 100}%)`;
    }
  };

  // --- Zoom Logic (Desktop) ---
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleButtonClick = () => {
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    if (isInCart) { navigate("/cart"); } 
    else { addToCart(product._id, 1); toast.success("Added to cart!"); }
  };

  if (loadingProduct) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-b-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-24 lg:pb-12">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart size={18} /></button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-100 flex items-center justify-center p-4">
          <div className="absolute top-6 right-6 flex gap-3">
            <button onClick={prevImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><ChevronLeft size={20}/></button>
            <button onClick={nextImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><ChevronRight size={20}/></button>
            <button onClick={() => setShowFullscreen(false)} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><Maximize2 /></button>
          </div>
          <img src={product.images?.[activeImg]} className="max-w-full max-h-full object-contain" alt="View" />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative overflow-hidden rounded-[3rem]  border-4 border-gray-300 shadow-lg group">
              {/* Image Container with Overflow Hidden */}
              <div 
                ref={imageContainerRef}
                className="relative aspect-square bg-[#F8F8F8] group cursor-zoom-in overflow-hidden"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => { setIsZooming(false); setIsSwiping(false); }}
                onMouseMove={handleMouseMove}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMoveCapture={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
              >
                {/* Image Track */}
                <div 
                  ref={imageTrackRef}
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeImg * 100}%)` }}
                >
                  {product.images?.map((img, i) => (
                    <div key={i} className="w-full h-full shrink-0 flex items-center justify-center">
                      <img 
                        src={img} 
                        className={`max-h-full object-contain select-none transition-opacity ${isZooming ? 'opacity-0' : 'opacity-100'}`} 
                        draggable="false" 
                        alt={`${product.name} - ${i + 1}`} 
                      />
                    </div>
                  ))}
                </div>

                {/* Desktop Zoom Overlay */}
                {isZooming && !isSwiping && !isMobile && (
                  <div 
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    style={{
                      backgroundImage: `url(${product.images[activeImg]})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '250%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}

                {/* Fullscreen Button */}
                <button 
                  onClick={() => setShowFullscreen(true)} 
                  className="absolute bottom-6 right-6 p-3 bg-white shadow-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Maximize2 size={18} />
                </button>
              </div>

              {/* Navigation Dots (Mobile) */}
              {isMobile && product?.images?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImg(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImg === index 
                          ? 'bg-black scale-110' 
                          : 'bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {product?.images?.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronRight size={20}/>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery with Scroll Arrows */}
            {product?.images?.length > 1 && (
              <div className="relative">
                {/* Left Scroll Arrow */}
                {!isMobile && (
                  <button 
                    onClick={() => {
                      if (thumbnailContainerRef.current) {
                        thumbnailContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {/* Thumbnail Container */}
                <div 
                  ref={thumbnailContainerRef}
                  className="flex gap-3 overflow-x-auto p-2 scrollbar-hide scroll-smooth"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {product.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setActiveImg(i);
                        scrollThumbnailIntoView(i);
                      }}
                      className={`relative shrink-0 transition-all duration-300 ${
                        activeImg === i 
                          ? 'ring-2 ring-black rounded-xl scale-105' 
                          : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <img 
                          src={img} 
                          className="w-full h-full object-cover" 
                          alt={`Thumbnail ${i + 1}`}
                        />
                      </div>
                      {activeImg === i && (
                        <div className="absolute pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Right Scroll Arrow */}
                {!isMobile && (
                  <button 
                    onClick={() => {
                      if (thumbnailContainerRef.current) {
                        thumbnailContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
                      }
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-100 rounded-full">
                  {product.brand || 'Originals'}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">₹{product.price?.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-300 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Bento Grid Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm"><Truck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-600">Shipping</p>
                  <p className="text-xs font-bold">Fast & Free</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm"><Shield size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-600">Warranty</p>
                  <p className="text-xs font-bold">24 Months</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">The Description</h3>
              <p className={`text-gray-600 leading-relaxed text-lg ${!expandDescription && 'line-clamp-4'}`}>
                {product.description}
              </p>
              {product.description?.length > 200 && (
                <button 
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-xs font-black uppercase tracking-widest border-2 border-black pb-1"
                >
                  {expandDescription ? 'Less -' : 'More +'}
                </button>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="space-y-4 pt-4">
              <button 
                onClick={handleButtonClick}
                disabled={loading || product.stock <= 0}
                className={`w-full py-5 rounded-4xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
                  isInCart ? 'bg-black text-white' : 'bg-black text-white hover:bg-zinc-800'
                } ${product.stock <= 0 ? 'bg-gray-100 text-gray-600 cursor-not-allowed shadow-none' : 'shadow-2xl shadow-black/20'}`}
              >
             
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : isInCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Go to Cart
                  </>
                ) : product.stock <= 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-600">Total Price</span>
            <span className="text-2xl font-black">₹{product.price?.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleButtonClick}
            disabled={loading || product.stock <= 0}
            className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-black/20 ${
              product.stock <= 0 
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white'
            }`}
          >
            {isInCart ? <><Check size={18}/> Cart</> : <><ShoppingCart size={18}/> Buy</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
