import React from 'react';
import { Truck, Phone, Mail, MapPin, Shield, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Premier Moving</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted moving partner for over 15 years. We make moving stress-free with professional service and care.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2 text-sm mt-2">
              <Award className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">BBB Accredited A+</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Local Moving</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Long-Distance Moving</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Commercial Moving</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Packing Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Storage Solutions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Senior Moving</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Get Quote</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Moving Tips</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service Areas</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">(123) 456-7890</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:info@premiermoving.com" className="hover:text-blue-400 transition-colors">info@premiermoving.com</a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <div>
                  <p>123 Moving Way</p>
                  <p>Business District, CA 90210</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">Business Hours:</p>
              <p className="text-sm text-gray-300">Mon-Fri: 7AM-7PM</p>
              <p className="text-sm text-gray-300">Sat-Sun: 8AM-5PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Premier Moving Company. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;