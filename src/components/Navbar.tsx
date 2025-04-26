
import { useState } from 'react';
import { Menu, Home, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle scroll event
  useState(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Nav links based on actual routes
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Rooms', href: '/rooms' },
  ];

  // Admin links only shown to admin users
  const adminLinks = user?.role === 'admin' ? [
    { name: 'Dashboard', href: '/admin' }
  ] : [];

  const allLinks = [...navLinks, ...adminLinks];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-hotel-brown">
              Rebstock
              <span className="block text-sm text-hotel-blue font-normal">
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
                className="text-sm font-medium hover:text-hotel-red transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/my-bookings" className="text-sm font-medium hover:text-hotel-red transition-colors">
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium hover:text-hotel-red transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center text-sm font-medium hover:text-hotel-red transition-colors"
              >
                <User size={18} className="mr-1" />
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center text-hotel-brown" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4">
          {allLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="block py-3 text-base font-medium border-b border-gray-200 hover:text-hotel-red transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link 
                to="/my-bookings" 
                className="block py-3 text-base font-medium border-b border-gray-200 hover:text-hotel-red transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center py-3 text-base font-medium hover:text-hotel-red transition-colors"
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
              className="flex items-center py-3 text-base font-medium hover:text-hotel-red transition-colors"
            >
              <User size={18} className="mr-2" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
