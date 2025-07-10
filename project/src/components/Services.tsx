import React from 'react';
import { Home, Truck, Package, Shield, Users, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Local Moving",
      description: "Professional local moves within the city and surrounding areas. Same-day service available.",
      features: ["Free estimates", "Packing materials included", "Furniture assembly"]
    },
    {
      icon: Truck,
      title: "Long-Distance Moving",
      description: "Interstate and cross-country moves with full tracking and dedicated support.",
      features: ["GPS tracking", "Storage options", "Climate-controlled trucks"]
    },
    {
      icon: Package,
      title: "Packing Services",
      description: "Professional packing and unpacking services to protect your valuable items.",
      features: ["Custom crating", "Fragile item protection", "Unpacking services"]
    },
    {
      icon: Shield,
      title: "Commercial Moving",
      description: "Office and business relocations with minimal downtime and secure handling.",
      features: ["After-hours service", "IT equipment handling", "Confidential document care"]
    },
    {
      icon: Users,
      title: "Senior Moving",
      description: "Specialized services for senior citizens with compassionate, patient care.",
      features: ["Downsizing assistance", "Gentle handling", "Family coordination"]
    },
    {
      icon: Clock,
      title: "Storage Solutions",
      description: "Short-term and long-term storage in our secure, climate-controlled facilities.",
      features: ["24/7 security", "Climate control", "Easy access"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Moving Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive moving solutions tailored to your specific needs, backed by our commitment to excellence and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow border hover:border-blue-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;