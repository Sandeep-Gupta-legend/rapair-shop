import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Samarth Mobile</h3>
            <p className="text-gray-400 mb-4">
              Professional mobile and laptop repair services in Mira Road. Quality service at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="https://wa.me/919867963398" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Shop no B 54, Shanti Shopping Centre, B Wing, Opposite Mira Road Station, Mira Road East, Mumbai, Maharashtra 401107
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <a href="tel:+919867963398" className="text-gray-400 hover:text-white">
                  +91 98679 63398
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-400">info@samarthmobile.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Samarth Mobile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
