/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ShoppingCart, 
  ChevronDown, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  Lock,
  Trash2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from './data/products';

// --- Types ---
interface CartItem {
  product: Product;
  quantity: number;
  variant: Record<string, string>;
}

// --- Components ---

const Header = ({ currentPage, setCurrentPage, cartCount, setIsCartOpen }: { currentPage: string, setCurrentPage: (page: string) => void, cartCount: number, setIsCartOpen: (open: boolean) => void }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#70E08B] py-2 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-4 h-4 bg-white rounded-full flex items-center justify-center text-[10px]">🚚</span>
        FREE USA SHIPPING ON ORDER $150+
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="text-[#70E08B] font-black text-3xl flex items-center gap-1">
            <span className="text-2xl">🌱</span> tula
          </div>
        </div>
        
        <div className="flex-1 max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Search Products" 
            className="w-full bg-gray-100 rounded-full py-2 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 text-sm font-medium hover:text-tula-green transition-colors">
            Support <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex flex-col items-center gap-0.5 text-[10px] font-bold uppercase">
            <User className="w-5 h-5" />
            Account
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-bold uppercase relative"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            <span className="absolute -top-1 -right-1 bg-tula-green text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3 text-sm font-medium text-gray-600">
            <li 
              onClick={() => setCurrentPage('home')}
              className={`hover:text-tula-green cursor-pointer transition-colors whitespace-nowrap ${currentPage === 'home' ? 'text-tula-green font-bold' : ''}`}
            >
              Home
            </li>
            <li 
              onClick={() => setCurrentPage('about')}
              className={`hover:text-tula-green cursor-pointer transition-colors whitespace-nowrap ${currentPage === 'about' ? 'text-tula-green font-bold' : ''}`}
            >
              About Us
            </li>
            <li 
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-tula-green cursor-pointer transition-colors whitespace-nowrap ${currentPage === 'contact' ? 'text-tula-green font-bold' : ''}`}
            >
              Contact Us
            </li>
            <li 
              onClick={() => setCurrentPage('collection')}
              className={`hover:text-tula-green cursor-pointer transition-colors whitespace-nowrap ${currentPage === 'collection' ? 'text-tula-green font-bold' : ''}`}
            >
              Products
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  cartItems: CartItem[],
  onUpdateQuantity: (index: number, delta: number) => void,
  onRemoveItem: (index: number) => void,
  onCheckout: () => void
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <button onClick={onClose} className="mt-6 text-tula-green font-bold underline">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-4/5 h-4/5 object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm leading-tight">{item.product.name}</p>
                          <button onClick={() => onRemoveItem(i)} className="text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-wider">
                          {Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-gray-100 rounded-full px-3 py-1">
                            <button onClick={() => onUpdateQuantity(i, -1)} disabled={item.quantity <= 1}>
                              <Minus className={`w-3 h-3 ${item.quantity <= 1 ? 'opacity-20' : 'cursor-pointer'}`} />
                            </button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(i, 1)}>
                              <Plus className="w-3 h-3 cursor-pointer" />
                            </button>
                          </div>
                          <p className="text-tula-green font-black">${(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-xl font-black text-tula-dark">${subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-6">Shipping & taxes calculated at checkout</p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-tula-green text-tula-dark py-4 rounded-full font-bold hover:bg-tula-dark hover:text-white transition-all shadow-lg"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[300px] overflow-hidden bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/shopify-theme/assets/hero-banner-default.png"
          alt="Medical professional"
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 h-full relative flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Social Prof Here</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Taking care of you can be simpler than it seems.
          </h1>
          <p className="text-sm opacity-90 mb-6 max-w-lg">
            When you're facing a new diagnosis, the last thing you need is confusion, delays, or unanswered questions.
          </p>
          <button className="bg-tula-green text-tula-dark px-6 py-2 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 text-sm">
            Contact Our Team
          </button>
        </div>
      </div>
      
      {/* Decorative leaf shape from mockup */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full pointer-events-none opacity-20">
        <svg viewBox="0 0 400 800" className="w-full h-full fill-tula-green">
          <path d="M400 800V0C179.086 0 0 179.086 0 400C0 620.914 179.086 800 400 800Z" />
        </svg>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const features = [
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Leading Quality", desc: "From bladder protection to skin creams, we never compromise on quality." },
    { icon: <CheckCircle2 className="w-8 h-8" />, title: "Convenient & Discreet", desc: "From bladder protection to skin creams, we never compromise on quality." },
    { icon: <Tag className="w-8 h-8" />, title: "Affordably Priced", desc: "From bladder protection to skin creams, we never compromise on quality." },
  ];

  return (
    <section className="bg-tula-green py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-12">Trusted by Over 1 Million Happy Customers</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="mb-4 text-tula-dark/80">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveDiagram = () => {
  return (
    <section className="bg-tula-dark py-24 relative overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-20 gap-4 p-4">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative flex justify-center">
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          {/* Central Circle */}
          <div className="w-[300px] h-[300px] border border-white/20 rounded-full flex items-center justify-center text-center p-8">
            <h2 className="text-white text-3xl font-bold leading-tight">
              More than equipment. <br />
              <span className="text-tula-green font-medium text-xl">A clear, digital and welcoming experience.</span>
            </h2>
          </div>

          {/* Orbiting Nodes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-xs uppercase tracking-widest">
            Technology that simplifies
          </div>
          
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-xs uppercase tracking-widest">
            Less confusion
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-xs uppercase tracking-widest">
             {/* Empty in mockup or placeholder */}
          </div>

          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-xs uppercase tracking-widest">
            A real relief
          </div>

          {/* Connecting Arrows (Simplified for CSS) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 500 500" className="w-full h-full stroke-tula-green fill-none opacity-50">
              <circle cx="250" cy="250" r="200" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

const DepartmentSlider = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const departments = [
    { name: "Scooters", img: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=300&h=300&fit=crop", spec: "Up to 15 miles range" },
    { name: "Lift Chairs", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop", spec: "3-position recline" },
    { name: "Power Wheelchairs", img: "https://images.unsplash.com/photo-1570125909236-7c6b0d8b4c6a?w=300&h=300&fit=crop", spec: "Tight turning radius" },
    { name: "Ramps", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", spec: "Anti-slip surface" },
    { name: "Wheelchairs", img: "https://images.unsplash.com/photo-1512299286776-52e87d7c6a30?w=300&h=300&fit=crop", spec: "Lightweight aluminum" },
  ];

  const handleQuickAdd = (name: string) => {
    // Simulated AJAX Cart Call
    console.log(`AJAX API: Adding ${name} to cart...`);
    onAddToCart();
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16">Shop By Department</h2>
        <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar">
          {departments.map((dept, i) => (
            <div key={i} className="min-w-[280px] flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-square mb-6 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center relative">
                <img src={dept.img} alt={dept.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => { e.stopPropagation(); handleQuickAdd(dept.name); }}
                  className="absolute bottom-4 bg-tula-dark text-white px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  Quick Add
                </button>
              </div>
              <h3 className="font-bold text-lg mb-1">{dept.name}</h3>
              {/* Simulated Metafield Display */}
              <p className="text-xs text-tula-green font-medium uppercase tracking-tighter opacity-80">
                Spec: {dept.spec}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-8 h-1.5 bg-tula-green rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="bg-tula-dark py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <h2 className="text-white text-2xl font-bold text-center md:text-left">
          Don't waste time and request what you need now
        </h2>
        <div className="flex items-center gap-6">
          <div className="text-tula-green flex items-center gap-2">
            <Phone className="w-6 h-6" />
          </div>
          <button className="bg-tula-green text-tula-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const testimonials = [
    { company: "Business Company", name: "Joseph Granger", text: "Our company has become much more efficient and our customers much more satisfied since we began our partnership with Tula." },
    { company: "Business Company", name: "Joseph Granger", text: "Our company has become much more efficient and our customers much more satisfied since we began our partnership with Tula." },
    { company: "Business Company", name: "Joseph Granger", text: "Our company has become much more efficient and our customers much more satisfied since we began our partnership with Tula." },
  ];

  return (
    <section className="py-24 bg-tula-light">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-tula-green mb-16">Partners who trust our equipment</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-tula-green/10">
              <div className="flex items-center gap-4 mb-6">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt={t.name} className="w-16 h-16 rounded-full grayscale" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">{t.company}</p>
                  <p className="font-bold text-tula-green">{t.name}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-8 h-1.5 bg-tula-green rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: "How to initiate a service request", a: "When you choose to Subscribe & Save with Because, you'll be able to guarantee that you'll have the products you need, when you need them, without having to remember to order them. Additionally, you'll save 10% on every order, get free shipping on orders over $75, have access to 24/7 customer support, and be able to skip or cancel your order, anytime. Ready to simplify your life? Simply choose \"Subscribe & Save\" when choosing your product. Orders are shipped automatically and delivered discreetly right to your door." },
    { q: "Documentation or compliance requirements", a: "Standard documentation includes medical necessity forms and insurance verification." },
    { q: "Process overview (step-by-step)", a: "Our process involves consultation, equipment selection, and white-glove delivery." },
    { q: "Referral or partnership processes", a: "We partner with hospitals and clinics to provide seamless equipment transitions." },
  ];

  return (
    <section className="bg-tula-green py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-tula-dark/20">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-6 flex items-center justify-between text-left font-bold text-lg"
              >
                {faq.q}
                {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-tula-dark/80 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-tula-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <h2 className="text-4xl font-bold mb-8 max-w-sm">Care and clarity, delivered to your inbox.</h2>
            <div className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email here" 
                className="flex-1 bg-white rounded-full px-6 py-3 text-tula-dark focus:outline-none"
              />
              <button className="bg-tula-green text-tula-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
                Start Now!
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-16">
              <div>
                <p className="font-bold mb-4">Contact Us</p>
                <p className="text-sm opacity-70">+1 (999) 888-77-66</p>
                <p className="text-sm opacity-70">hello@tulacare.com</p>
              </div>
              <div>
                <p className="font-bold mb-4">Location</p>
                <p className="text-sm opacity-70">250 Hudson St floor 6</p>
                <p className="text-sm opacity-70">New York, NY 10013, USA</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="font-bold mb-8">Support</p>
            <ul className="space-y-4 text-sm opacity-70">
              <li>Contact Us</li>
              <li>Shipping & Delivery</li>
              <li>Track Your Order</li>
              <li>Care Instructions</li>
              <li>Size Charts</li>
            </ul>
          </div>
          
          <div>
            <p className="font-bold mb-8">Discover</p>
            <ul className="space-y-4 text-sm opacity-70">
              <li>About Us</li>
              <li>Customizations</li>
              <li>Reviews</li>
              <li>Rewards</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/10 gap-8">
          <div className="flex gap-6">
            <Facebook className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
            <Instagram className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
            <Twitter className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
            <Youtube className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer" />
          </div>
          <p className="text-xs opacity-50">© 2025 Tula All rights reserved.</p>
          <div className="flex gap-8 text-xs opacity-50">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AboutHero = () => {
  return (
    <section className="bg-[#E2F5E9] py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <p className="text-tula-dark font-bold uppercase tracking-widest text-sm mb-4">About Us</p>
        <h1 className="text-5xl font-bold text-tula-green mb-8 leading-tight">
          Lorem Ipsum dolor sit amet consectetur
        </h1>
        <p className="text-tula-dark/70 text-lg leading-relaxed">
          Consectetur adipiscing elit. Nulla blandit turpis sed commodo consequat. Nulla blandit turpis sed commodo consequat.
        </p>
      </div>
      
      {/* Dot pattern circle background from mockup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
        <div className="grid grid-cols-20 gap-4">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-tula-green rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutStory1 = () => {
  return (
    <section className="bg-[#4A8B6A] py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80">Lorem ipsum dolor sit</p>
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            Our story stems from the pursuit of comfort.
          </h2>
          <p className="text-lg opacity-90 mb-8">
            When you're facing a new diagnosis, the last thing you need is confusion, delays, or unanswered questions.
          </p>
          <ul className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-tula-green" />
                <span className="opacity-90">When you're facing a new diagnosis.</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-square rounded-3xl ${i % 3 === 0 ? 'bg-[#D1F2D9]' : 'bg-[#70E08B]'}`} />
          ))}
          <div className="col-span-2 h-24 bg-white rounded-full" />
          <div className="aspect-square bg-[#70E08B] rounded-3xl" />
        </div>
      </div>
    </section>
  );
};

const AboutStory2 = () => {
  return (
    <section className="bg-tula-dark py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-white">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80">Lorem ipsum dolor sit</p>
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            Our story stems from the pursuit of comfort.
          </h2>
        </div>
        <div className="text-white/70 leading-relaxed">
          <p>When you're facing a new diagnosis, the last thing you need is confusion, delays, or unanswered questions. When you're facing a new diagnosis, the last thing you need is confusion, delays, or unanswered questions.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 grid md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-white">
            <div className="text-tula-green mb-4">
              {i === 1 && <ShieldCheck className="w-8 h-8" />}
              {i === 2 && <Phone className="w-8 h-8" />}
              {i === 3 && <Tag className="w-8 h-8" />}
              {i === 4 && <User className="w-8 h-8" />}
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              When you're facing a new diagnosis, the last thing you need is confusion, delays, or unanswered questions.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutTeam = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Lorem ipsum dolor sit</p>
        <h2 className="text-center text-5xl font-bold mb-16">Our story stems from</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-48 h-48 bg-tula-dark rounded-full mx-auto mb-8" />
              <h3 className="font-bold text-lg mb-2">Convenient & Discreet</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                From bladder protection to skin creams, we never compromise on quality.
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 mt-24">
          {[
            { n: "100%", l: "From bladder protection to skin creams, we never compromise on quality." },
            { n: "55", l: "From bladder protection to skin creams, we never compromise on quality." },
            { n: "627", l: "From bladder protection to skin creams, we never compromise on quality." },
            { n: "673", l: "From bladder protection to skin creams, we never compromise on quality." },
            { n: "5.315", l: "From bladder protection to skin creams, we never compromise on quality." },
            { n: "12", l: "From bladder protection to skin creams, we never compromise on quality." },
          ].map((stat, i) => (
            <div key={i} className="border-t border-gray-200 pt-8">
              <p className="text-5xl font-bold text-tula-green mb-4">{stat.n}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPartners = () => {
  const logos = [
    { name: 'VITAS Healthcare', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=80&fit=crop' },
    { name: 'aveanna healthcare', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=80&fit=crop' },
    { name: 'PARKVIEW HEALTH', img: 'https://images.unsplash.com/photo-1584467735871-8db9ac8d0916?w=200&h=80&fit=crop' },
    { name: 'Huntington Hospital', img: 'https://images.unsplash.com/photo-1516549655669-df6654e435de?w=200&h=80&fit=crop' },
    { name: 'HCA Healthcare', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=80&fit=crop' },
    { name: 'Northwell Huntington Hospital', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&h=80&fit=crop' },
  ];

  return (
    <section className="py-24 bg-[#F4FBF7]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Partners</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit turpis sed commodo consequat.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center">
              <img src={logo.img} alt={logo.name} className="max-h-12 grayscale" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuoteBanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=600&fit=crop" 
        alt="Team shaking hands" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-tula-dark/60" />
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <div className="text-tula-green text-6xl mb-8">“</div>
        <h2 className="text-3xl md:text-4xl font-bold max-w-4xl mx-auto mb-8 leading-relaxed">
          Our company has become much more efficient and our customers much more satisfied since we began our partnership with Tula.
        </h2>
        <p className="font-bold text-tula-green">Tula Team</p>
      </div>
    </section>
  );
};

const CollectionPage = ({ setCurrentPage: setAppPage, onSelectProduct }: { setCurrentPage: (page: string) => void, onSelectProduct: (product: Product) => void }) => {
  const [openFilters, setOpenFilters] = useState({ category: true, weight: false, width: false, price: false });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    setAppPage('product');
  };

  // Calculate pagination
  const totalProducts = PRODUCTS.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = PRODUCTS.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg px-6 py-3 text-xs text-gray-500 flex items-center gap-2">
            <span className="cursor-pointer hover:text-tula-green" onClick={() => setAppPage('home')}>Home</span>
            <span className="text-gray-400">›</span>
            <span className="text-tula-dark font-medium">All Products</span>
          </div>
      </div>

      {/* Main Collection Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">All Products</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <span className="font-bold flex items-center gap-2">Filter <span className="text-gray-400">⚙️</span></span>
                <span className="text-tula-green text-xs font-bold">{totalProducts} results</span>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <button 
                  onClick={() => setOpenFilters({...openFilters, category: !openFilters.category})}
                  className="w-full flex items-center justify-between font-bold text-sm mb-4"
                >
                  Category
                  <Minus className={`w-4 h-4 transition-transform ${!openFilters.category ? 'rotate-90' : ''}`} />
                </button>
                {openFilters.category && (
                  <div className="space-y-3">
                    {['Hospital Beds', 'Mattresses', 'Scooters', 'Wheelchairs', 'Lifts'].map((cat, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors border-gray-300 group-hover:border-tula-green`}>
                        </div>
                        <span className={`text-xs text-gray-500 group-hover:text-tula-dark`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Filters (Collapsed) */}
              {['Product Weight', 'Seat Width', 'Price'].map((filter) => (
                <div key={filter} className="mb-6 pt-4 border-t border-gray-100">
                  <button className="w-full flex items-center justify-between font-bold text-sm">
                    {filter}
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* Product List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Sort by</span>
                <button className="font-bold flex items-center gap-1">
                  Featured <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => handleProductClick(product)}>
                  <div className="w-full md:w-48 h-48 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-tula-green transition-colors">{product.name}</h3>
                    <ul className="space-y-2">
                      {product.specs.slice(0, 3).map((spec, i) => (
                        <li key={i} className="text-xs text-gray-500 flex gap-2">
                          <span className="text-tula-green">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full md:w-48 flex flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                    <div className="text-right mb-4">
                      <div className="flex text-yellow-400 text-xs mb-1">
                        {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>)}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{product.rating} | {product.reviewCount} Reviews</p>
                    </div>
                    
                    <div className="text-center md:text-right mb-6">
                      <p className="text-3xl font-black text-tula-green">${product.price.toLocaleString()}</p>
                    </div>

                    <button 
                      className="w-full bg-tula-green text-tula-dark py-3 rounded-full font-bold text-sm hover:bg-tula-dark hover:text-white transition-all"
                    >
                      View More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-tula-green hover:bg-tula-green/10'}`}
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === pageNum ? 'bg-tula-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-400">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === totalPages ? 'bg-tula-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-tula-green hover:bg-tula-green/10'}`}
                  >
                    Next
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Show</span>
                  <select 
                    value={productsPerPage}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm"
                    onChange={(e) => {
                      // In a real app, this would update productsPerPage state
                      console.log(`Changed to ${e.target.value} per page`);
                    }}
                  >
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                  </select>
                  <span className="text-gray-500">per page</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FAQ />
    </div>
  );
};

const ProductPage = ({ product, onAddToCart, setCurrentPage }: { product: Product, onAddToCart: (product: Product, variant: Record<string, string>) => void, setCurrentPage: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach(v => {
      initial[v.name] = v.options[0];
    });
    return initial;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg px-6 py-3 text-xs text-gray-500 flex items-center gap-2">
          <span className="cursor-pointer hover:text-tula-green" onClick={() => setCurrentPage('home')}>Home</span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:text-tula-green" onClick={() => setCurrentPage('collection')}>All Products</span>
          <span>&gt;</span>
          <span className="text-tula-dark font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {product.images.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 bg-gray-50 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${selectedImage === i ? 'border-tula-green' : 'border-gray-100 hover:border-tula-green'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-4/5 h-4/5 object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative group overflow-hidden">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-4/5 h-4/5 object-contain" 
                />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="w-5 h-5 rotate-90" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">SKU# {product.sku} / ITEM ID # {product.id}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-tula-green font-bold mb-4">By {product.brand}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>)}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{product.rating} | {product.reviewCount} Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <p className="text-4xl font-black text-tula-green">${product.price.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-300 line-through font-bold">${product.originalPrice.toLocaleString()}</p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {product.variants?.map((variant) => (
                  <div key={variant.name} className="relative">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">{variant.name} ({variant.options.length})</label>
                    <select 
                      value={selectedVariants[variant.name]}
                      onChange={(e) => setSelectedVariants({...selectedVariants, [variant.name]: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-tula-green/50 font-medium text-sm"
                    >
                      {variant.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-[60%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                ))}
                
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-tula-green" />
                    <span>Accessories (0 Selected) <span className="text-tula-green underline cursor-pointer">Select</span></span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => onAddToCart(product, selectedVariants)}
                  className="flex-1 bg-tula-green text-tula-dark py-4 rounded-full font-bold hover:bg-tula-dark hover:text-white transition-all shadow-lg"
                >
                  Add to cart
                </button>
                <button className="flex-1 border-2 border-gray-200 py-4 rounded-full font-bold hover:border-tula-green transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Bar */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="bg-[#E2F5E9] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Need Help?</span>
              <span className="text-sm text-gray-500">Talk to one of our Experts!</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                <Phone className="w-4 h-4 text-tula-green" /> Give us a call
              </button>
              <button className="bg-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                <Instagram className="w-4 h-4 text-tula-green" /> Send us a message
              </button>
              <button className="bg-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                <User className="w-4 h-4 text-tula-green" /> Chat with an Agent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs & Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex border-b border-gray-100 mb-8">
              {['details', 'specs', 'warranty', 'returns'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === tab ? 'border-tula-green text-tula-green' : 'border-transparent text-gray-400'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              {activeTab === 'details' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="font-bold text-lg mb-6">About the {product.name}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <h3 className="font-bold text-lg mb-6">Product Highlights</h3>
                  <ul className="space-y-4">
                    {product.specs.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-500">
                        <span className="text-tula-green">•</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      {product.specs.map((s, i) => (
                        <tr key={i}>
                          <td className="py-4 font-bold text-gray-400 uppercase text-[10px] w-1/3">Specification {i+1}</td>
                          <td className="py-4 text-gray-600">{s}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-center font-bold text-lg mb-8">Frequently Bought Together</h3>
              <div className="space-y-8">
                {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map((p) => (
                  <div key={p.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={p.images[0]} alt={p.name} className="w-4/5 h-4/5 object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold mb-1 leading-tight">{p.name}</p>
                      <p className="text-tula-green font-black text-sm mb-2">${p.price.toLocaleString()}</p>
                      <button className="bg-tula-green text-tula-dark px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-tula-dark hover:text-white transition-all">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-tula-green rounded-full flex items-center justify-center mb-6">
                <Plus className="w-6 h-6 rotate-45" />
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">How to Buy:<br />Advice from the experts</h2>
              <p className="text-gray-500 mb-8 max-w-md">The experts at Tula Medical show you how to choose the right equipment for your needs.</p>
              <button className="border-2 border-gray-200 px-8 py-3 rounded-full font-bold hover:border-tula-green transition-all">
                Get More Help
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=450&fit=crop" alt="Video Thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-tula-green border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-12">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center group cursor-pointer" onClick={() => { setCurrentPage('product'); window.scrollTo(0, 0); }}>
                <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-xs font-bold mb-1 group-hover:text-tula-green transition-colors">{p.name}</p>
                <p className="text-tula-green font-black text-sm">${p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductReviews product={product} />
      <FAQ />
    </div>
  );
};

const ProductReviews = ({ product }: { product: Product }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-16">Verified Reviews from people like you!</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="text-center border-r border-gray-100">
            <p className="text-6xl font-black text-tula-dark mb-2">{product.rating}</p>
            <div className="flex justify-center text-tula-green text-xl mb-2">
              {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>)}
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase">{product.reviewCount} Reviews</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-4">
                <span className="text-xs font-bold w-4">{star} ★</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-tula-green" style={{ width: `${star * 15 + 20}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 w-8">{star * 100 + 45}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-12 pb-8 border-b border-gray-100">
          <div className="relative flex-1 max-w-md">
            <input type="text" placeholder="Search reviews" className="w-full bg-gray-50 rounded-full py-2 px-6 pr-12 text-sm" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold border border-gray-200 px-4 py-2 rounded-full">
              All ratings <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 text-xs font-bold border border-gray-200 px-4 py-2 rounded-full">
              Most relevant <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="pb-12 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="font-bold">Customer {i}</p>
                  <p className="text-[10px] text-tula-green font-bold uppercase">Verified Buyer</p>
                </div>
                <div className="text-right">
                  <div className="flex text-tula-green text-sm mb-1">
                    {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{i} month ago</p>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-4xl">
                This {product.name} has been a life changer for our family. The quality is exceptional and the delivery was faster than expected. Highly recommend Tula Medical!
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-gray-200 px-12 py-3 rounded-full font-bold hover:border-tula-green transition-all">
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

const CheckoutPage = ({ cartItems, onComplete }: { cartItems: CartItem[], onComplete: () => void }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Simple form validation state
  const [formValid, setFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  // Validate form on change
  const validateForm = () => {
    const { email, firstName, lastName, address, city, zipCode, cardNumber, cardExpiry, cardCvv } = formValues;
    const isValid = 
      email.includes('@') && 
      firstName.trim() !== '' && 
      lastName.trim() !== '' && 
      address.trim() !== '' && 
      city.trim() !== '' && 
      zipCode.trim() !== '' && 
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardExpiry.includes('/') &&
      cardCvv.length >= 3;
    
    setFormValid(isValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Validate after a short delay
    setTimeout(validateForm, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) {
      alert('Please fill in all required fields correctly before completing your purchase.');
      return;
    }
    onComplete();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="text-tula-green font-black text-3xl">🌱 tula</div>
          <div className="h-4 w-px bg-gray-300 mx-2" />
          <h1 className="text-xl font-bold">Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 bg-tula-green text-tula-dark rounded-full flex items-center justify-center text-sm">1</span>
                  Contact Information
                </h2>
                <p className="text-xs text-gray-400">Already have an account? <span className="text-tula-green underline cursor-pointer">Log in</span></p>
              </div>
              <div className="space-y-4">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address *" 
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-tula-green focus:ring-tula-green" />
                  <span className="text-sm text-gray-500">Keep me up to date on news and exclusive offers</span>
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
                <span className="w-8 h-8 bg-tula-green text-tula-dark rounded-full flex items-center justify-center text-sm">2</span>
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name *" 
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name *" 
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <input 
                  type="text" 
                  name="address"
                  placeholder="Address *" 
                  value={formValues.address}
                  onChange={handleInputChange}
                  required
                  className="md:col-span-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <input 
                  type="text" 
                  placeholder="Apartment, suite, etc. (optional)" 
                  className="md:col-span-2 w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <input 
                  type="text" 
                  name="city"
                  placeholder="City *" 
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50 appearance-none">
                    <option>State *</option>
                    <option>NY</option>
                    <option>CA</option>
                  </select>
                  <input 
                    type="text" 
                    name="zipCode"
                    placeholder="ZIP Code *" 
                    value={formValues.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
                <span className="w-8 h-8 bg-tula-green text-tula-dark rounded-full flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className="border border-tula-green bg-tula-green/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-tula-green" />
                      <span className="font-bold">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-gray-200 rounded" />
                      <div className="w-8 h-5 bg-gray-200 rounded" />
                      <div className="w-8 h-5 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="Card Number *" 
                      value={formValues.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="cardExpiry"
                        placeholder="MM / YY *" 
                        value={formValues.cardExpiry}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                      />
                      <input 
                        type="text" 
                        name="cardCvv"
                        placeholder="CVV *" 
                        value={formValues.cardCvv}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tula-green/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border border-gray-300 rounded-full" />
                    <span className="font-bold text-gray-500">PayPal</span>
                  </div>
                  <div className="text-blue-600 font-black italic text-xl">PayPal</div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!formValid}
              className={`w-full ${formValid ? 'bg-tula-dark text-white hover:bg-tula-green hover:text-tula-dark' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} py-6 rounded-full font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3`}
            >
              <Lock className="w-5 h-5" />
              {formValid ? `Complete Purchase — $${total.toLocaleString()}` : 'Please fill all required fields'}
            </button>
          </div>

          {/* Right Column: Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto no-scrollbar">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 relative flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-tight mb-1">{item.product.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        {Object.values(item.variant).join(' / ')}
                      </p>
                    </div>
                    <p className="text-sm font-bold">${(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Taxes</span>
                  <span className="font-bold">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-tula-green">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 bg-tula-green/10 rounded-2xl p-4 flex items-center gap-4">
                <Truck className="w-6 h-6 text-tula-green" />
                <div>
                  <p className="text-xs font-bold">Free Shipping Applied!</p>
                  <p className="text-[10px] text-gray-500">Your order qualifies for free standard shipping.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-24 animate-in zoom-in duration-500">
      <div className="max-w-md w-full text-center px-4">
        <div className="w-24 h-24 bg-tula-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-tula-green/20">
          <Check className="w-12 h-12 text-tula-dark" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-12 leading-relaxed">
          Thank you for your purchase. We've sent a confirmation email to your inbox. Your equipment is being prepared for shipment.
        </p>
        
        <div className="bg-gray-50 rounded-3xl p-8 mb-12 text-left">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase">Order Number</span>
            <span className="text-sm font-bold">#TULA-88492</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase">Estimated Delivery</span>
            <span className="text-sm font-bold">Oct 24 - Oct 28</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Shipping Method</span>
            <span className="text-sm font-bold">Standard Ground</span>
          </div>
        </div>

        <button 
          onClick={() => setCurrentPage('home')}
          className="w-full bg-tula-green text-tula-dark py-4 rounded-full font-bold hover:bg-tula-dark hover:text-white transition-all shadow-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      {/* Contact Hero */}
      <section className="bg-[#E2F5E9] py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <p className="text-tula-dark font-bold uppercase tracking-widest text-sm mb-4">Contact</p>
          <h1 className="text-5xl font-bold text-tula-green mb-8 leading-tight">
            Lorem Ipsum dolor sit amet consectetur
          </h1>
          <p className="text-tula-dark/70 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit turpis sed commodo consequat.
          </p>
        </div>
        
        {/* Dot pattern background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="grid grid-cols-20 gap-4">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-tula-green rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contat US</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Firs Name</label>
                  <input type="text" defaultValue="Graziela" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tula-green/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
                  <input type="text" defaultValue="Leite" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tula-green/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">E-mail address</label>
                <input type="email" defaultValue="graziela@onlinecyclinggear.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tula-green/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Order Number (optional)</label>
                <input type="text" defaultValue="+55 00 00000-0000" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tula-green/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
                <textarea rows={6} defaultValue="Digite your message" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tula-green/50 resize-none" />
              </div>
              <button type="submit" className="w-full bg-tula-green text-tula-dark py-4 rounded-full font-bold hover:bg-tula-dark hover:text-white transition-all">
                Submit
              </button>
            </form>
          </div>

          {/* Customer Service Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Customer Service</h2>
            <div className="space-y-1 bg-[#E2F5E9] rounded-2xl overflow-hidden">
              <div className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-tula-green">
                  <Plus className="w-5 h-5 rotate-45" />
                </div>
                <span className="text-sm font-medium">Monday - Friday: 9:00am - 5:00pm EDT</span>
              </div>
              <div className="p-6 flex items-center gap-4 bg-white/50">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-tula-green">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">678-904-1680</span>
              </div>
              <div className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-tula-green">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">support@tkdn360help.zendesk.com</span>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="text-tula-green font-bold">Note:</span> E-commerce customer service is handled through email only. Please call us for any team sales inquires.
                </p>
                <p className="text-sm font-bold">
                  To start return or exchange please <span className="text-tula-green underline cursor-pointer">click here</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Contact Bar */}
      <section className="bg-tula-dark py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12">
          <div className="flex items-center gap-3 text-white">
            <Phone className="w-5 h-5 text-tula-green" />
            <span className="text-sm font-bold">Call 1 (888) 257-2024</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Instagram className="w-5 h-5 text-tula-green" />
            <span className="text-sm font-bold">Live Chat With An Expert</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <User className="w-5 h-5 text-tula-green" />
            <span className="text-sm font-bold">helpdesk@medmart.com</span>
          </div>
        </div>
      </section>
      
      <FAQ />
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <AboutHero />
      <AboutStory1 />
      <AboutStory2 />
      <AboutTeam />
      <Partners /> {/* Reusing the testimonial section from home */}
      <AboutPartners />
      <QuoteBanner />
      <CTABanner />
      <FAQ />
    </div>
  );
};

const Home = ({ onAddToCart }: { onAddToCart: () => void }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <TrustBar />
      <InteractiveDiagram />
      <DepartmentSlider onAddToCart={onAddToCart} />
      <CTABanner />
      <Partners />
      <FAQ />
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product, variant: Record<string, string>) => {
    setCartItems(prev => {
      const existing = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );
      if (existing > -1) {
        const next = [...prev];
        next[existing].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1, variant }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems(prev => {
      const next = [...prev];
      next[index].quantity = Math.max(1, next[index].quantity + delta);
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleCompletePurchase = () => {
    setCartItems([]);
    setCurrentPage('success');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'checkout' && currentPage !== 'success' && (
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          cartCount={cartItems.length}
          setIsCartOpen={setIsCartOpen}
        />
      )}
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <main>
        {currentPage === 'home' && <Home onAddToCart={() => {}} />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'collection' && (
          <CollectionPage 
            setCurrentPage={setCurrentPage} 
            onSelectProduct={setSelectedProduct} 
          />
        )}
        {currentPage === 'product' && selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onAddToCart={handleAddToCart} 
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'checkout' && (
          <CheckoutPage 
            cartItems={cartItems} 
            onComplete={handleCompletePurchase} 
          />
        )}
        {currentPage === 'success' && (
          <SuccessPage setCurrentPage={setCurrentPage} />
        )}
      </main>

      {currentPage !== 'checkout' && currentPage !== 'success' && <Footer />}
    </div>
  );
}
