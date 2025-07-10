import React from 'react';
import { Shield, Award, Users, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "15,000+", label: "Moves Completed" },
    { number: "50+", label: "Professional Movers" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  const certifications = [
    { name: "Licensed & Insured", icon: Shield },
    { name: "BBB Accredited A+", icon: Award },
    { name: "DOT Certified", icon: Shield },
    { name: "ProMover Certified", icon: Star }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Premier Moving</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2008, Premier Moving has grown from a small local operation to one of the most trusted moving companies in the region. Our family-owned business is built on the principles of integrity, reliability, and exceptional customer service.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We understand that moving is more than just transporting items—it's about transitioning to a new chapter of your life. That's why we treat every move with the care and attention it deserves, ensuring your belongings arrive safely and on time.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                  <cert.icon className="h-5 w-5 text-green-600" />
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.pexels.com/photos/7464313/pexels-photo-7464313.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Moving team"
              className="rounded-xl shadow-lg h-48 w-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/5025665/pexels-photo-5025665.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Professional packing"
              className="rounded-xl shadow-lg h-48 w-full object-cover mt-8"
            />
            <img 
              src="https://images.pexels.com/photos/7464708/pexels-photo-7464708.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Moving truck"
              className="rounded-xl shadow-lg h-48 w-full object-cover -mt-8"
            />
            <img 
              src="https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Happy customers"
              className="rounded-xl shadow-lg h-48 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;