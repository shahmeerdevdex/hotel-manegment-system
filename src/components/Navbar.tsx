
import { useState, useEffect } from 'react';
import { Menu, Home, LogOut, User, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav links based on actual routes
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Amenities', href: '/#amenities' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Admin links only shown to admin users
  const adminLinks = user?.role === 'admin' ? [
    { name: 'Dashboard', href: '/admin' }
  ] : [];

  const allLinks = [...navLinks, ...adminLinks];

  // Determine text color based on scroll state and current page
  const getTextColor = () => {
    if (isScrolled) {
      return 'text-hotel-brown';
    }
    
    // Only use white text on home page
    if (isHomePage) {
      return 'text-white';
    }
    
    // Default to brown text on other pages for better visibility
    return 'text-hotel-brown';
  };

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className={`hidden md:block w-full bg-hotel-brown text-white py-2 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-2" />
              <span>123 Luxury Ave, Beverly Hills, CA</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-hotel-accent transition-colors">Special Offers</a>
            <a href="#" className="text-sm hover:text-hotel-accent transition-colors">Gift Cards</a>
            <a href="#" className="text-sm hover:text-hotel-accent transition-colors">Loyalty Program</a>
          </div>
        </div>
      </div>
    
      {/* Main Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : isHomePage ? 'bg-transparent py-6 md:mt-9' : 'bg-white py-6 shadow-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className={`font-serif transition-all duration-300 ${
                isScrolled ? 'text-2xl text-hotel-brown' : isHomePage ? 'text-2xl md:text-3xl text-white' : 'text-2xl md:text-3xl text-hotel-brown'
              }`}>
                Rebstock
                <span className={`block transition-all duration-300 ${
                  isScrolled ? 'text-sm text-hotel-accent' : 'text-sm md:text-base text-hotel-accent/90'
                }`}>
                  Hotel & Resort
                </span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {allLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-hotel-brown hover:text-hotel-accent' 
                      : `${getTextColor()} hover:text-hotel-accent`
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/my-bookings" 
                    className={`text-sm font-medium transition-colors ${
                      isScrolled 
                        ? 'text-hotel-brown hover:text-hotel-accent' 
                        : `${getTextColor()} hover:text-hotel-accent`
                    }`}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className={`text-sm font-medium transition-colors flex items-center ${
                      isScrolled 
                        ? 'text-hotel-brown hover:text-hotel-accent' 
                        : `${getTextColor()} hover:text-hotel-accent`
                    }`}
                  >
                    <LogOut size={16} className="mr-1" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className={`flex items-center text-sm font-medium transition-all duration-300 border px-4 py-2 rounded-md ${
                    isScrolled 
                    ? 'text-hotel-brown hover:text-white border-hotel-accent hover:bg-hotel-accent' 
                    : isHomePage
                      ? 'text-white hover:text-hotel-brown border-white hover:bg-white'
                      : 'text-hotel-brown hover:text-white border-hotel-accent hover:bg-hotel-accent'
                  }`}
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden flex items-center ${isScrolled ? 'text-hotel-brown' : isHomePage ? 'text-white' : 'text-hotel-brown'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute w-full bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                {allLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block py-3 text-base font-medium border-b border-gray-200 text-hotel-brown hover:text-hotel-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link 
                      to="/my-bookings" 
                      className="block py-3 text-base font-medium border-b border-gray-200 text-hotel-brown hover:text-hotel-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center py-3 text-base font-medium text-hotel-brown hover:text-hotel-accent transition-colors w-full"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center py-3 text-base font-medium text-hotel-brown hover:text-hotel-accent transition-colors w-full"
                  >
                    <User size={18} className="mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
