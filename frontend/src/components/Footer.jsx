import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div>
            <h2 className="text-2xl font-bold">Job <span className="text-[#f83002]">Portal</span></h2>
            <p className="mt-4">
              Your one-stop destination for finding your dream job or hiring the perfect candidate.
            </p>
          </div>

          {/* Column 2: Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Frontend Developer</a></li>
              <li><a href="#" className="hover:underline">Backend Developer</a></li>
              <li><a href="#" className="hover:underline">Full Stack Developer</a></li>
              <li><a href="#" className="hover:underline">Data Analyst</a></li>
            </ul>
          </div>

          {/* Column 3: Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:info@jobportal.com" className="hover:underline">info@jobportal.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:underline">+123 456 7890</a></p>
            <div className="mt-4 flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">© 2024 Job Portal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;