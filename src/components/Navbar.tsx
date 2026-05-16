import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Star } from 'lucide-react';
import { CATEGORIES } from '@/src/data/tools';
import { cn } from '@/src/lib/utils';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] text-white shadow-lg border-b border-[#0066cc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-[#0066cc]">Tool</span><span className="text-[#00d4ff]">Studio</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 h-full items-center text-sm font-medium">
              <Link 
                to="/favorites" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16213e] border border-gray-700/50 hover:bg-[#0066cc] hover:border-[#0066cc] transition-all text-gray-300 hover:text-white"
              >
                <Star className="w-3.5 h-3.5 fill-[#00d4ff] text-[#00d4ff]" />
                <span>Favorites</span>
              </Link>

              {CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(cat.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 hover:text-[#00d4ff] transition-colors">
                    <span>{cat.name}</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </button>

                  {/* Dropdown */}
                  <div className={cn(
                    "absolute top-full left-0 w-56 bg-[#16213e] border border-[#1a1a2e] shadow-2xl py-2 transition-all duration-200 opacity-0 invisible translate-y-2 rounded-b-lg",
                    activeDropdown === cat.id && "opacity-100 visible translate-y-0"
                  )}>
                    {cat.tools.map((tool) => (
                      <Link
                        key={tool.id}
                        to={`/${cat.id}/${tool.id}`}
                        className="block px-4 py-2 text-xs hover:bg-[#0066cc] hover:text-white transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-[10px] bg-[#16213e] px-4 py-2 rounded-full border border-gray-700/50 uppercase tracking-widest">
              <span className="text-gray-400">Trending:</span>
              <Link to="/calculators/bmi" className="text-[#00d4ff] underline hover:text-white transition-colors">BMI Calculator</Link>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-[#16213e] transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div className={cn(
        "md:hidden bg-[#16213e] overflow-hidden transition-all duration-300",
        isOpen ? "max-h-screen" : "max-h-0"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-bold text-[#00d4ff] hover:bg-[#0066cc] hover:text-white transition-colors border-b border-gray-800"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>My Favorites</span>
          </Link>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="py-2">
              <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                {cat.name}
              </div>
              {cat.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/${cat.id}/${tool.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#0066cc] hover:text-white transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
