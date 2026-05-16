import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] text-gray-400 py-12 border-t border-[#0066cc]/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">
          {/* About */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-tight">About ToolStudio</h4>
            <p className="text-xs leading-relaxed opacity-80">
              All-in-one free tool collection for developers, students, and everyday tasks. 
              Privacy-focused, lightweight, and fast.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-tight">Quick Links</h4>
            <ul className="text-xs space-y-2">
              <li><Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link></li>
              <li><Link to="/converters/length" className="hover:text-[#00d4ff] transition-colors">All Tools</Link></li>
              <li><span className="cursor-pointer hover:text-[#00d4ff] transition-colors">Contact Us</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-tight">Legal</h4>
            <ul className="text-xs space-y-2">
              <li><span className="cursor-pointer hover:text-[#00d4ff] transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-[#00d4ff] transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-[#00d4ff] transition-colors">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col items-center space-y-4">
          <div className="flex space-x-6 text-gray-500">
            <Twitter className="w-4 h-4 cursor-pointer hover:text-[#00d4ff] transition-colors" />
            <Github className="w-4 h-4 cursor-pointer hover:text-[#00d4ff] transition-colors" />
            <Mail className="w-4 h-4 cursor-pointer hover:text-[#00d4ff] transition-colors" />
          </div>
          <p className="text-[11px] text-gray-500 text-center uppercase tracking-widest">
            &copy; {currentYear} ToolStudio - Made with precision for your daily tasks
          </p>
        </div>
      </div>
    </footer>
  );
};
