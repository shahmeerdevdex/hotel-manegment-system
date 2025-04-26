
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LuxStay Hotels</h3>
            <p className="text-sm mb-6">
              Elevating the art of hospitality with exceptional service and unforgettable experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Find & Reserve</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Meetings & Events</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Our Brands</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Cancellation Options</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Safety Resource Center</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Report Concern</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Manage Your Account</a></li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Cookie Statement</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 LuxStay Hotels. All rights reserved.</p>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <Globe size={16} className="mr-2" />
                <select className="bg-transparent text-sm border-none focus:outline-none text-gray-300">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="text-sm hover:text-white transition-colors">Sitemap</a>
                <a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
