import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, ArrowRight, MessageSquare, Search } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Helmet>
        <title>About Us - ToolStudio | Free, Private, and Fast Online Tools</title>
        <meta name="description" content="Learn more about ToolStudio, our mission to provide high-quality free tools, and our commitment to privacy and speed." />
      </Helmet>

      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-6"
        >
          About <span className="text-[#0066cc]">ToolStudio</span>
        </motion.h1>
        <div className="w-20 h-1.5 bg-[#0066cc] mx-auto rounded-full mb-8"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We believe everyone should have access to high-quality, professional-grade diagnostic and conversion tools without the friction of subscriptions or data tracking.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-gray-600 mb-16">
        <p>
          ToolStudio was born out of a simple frustration: the internet is full of "free" tools that are either buried under aggressive advertisements, require an account to see results, or harvest your data for marketing. 
        </p>
        <p>
          We set out to build the opposite. A clean, lightning-fast workshop where you can get your work done and move on with your day. Whether you're a developer needing a UUID, a traveler converting currency, or a health-conscious individual checking your BMI, ToolStudio is designed to be your reliable digital sidekick.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center"
        >
          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-[#1a1a2e] mb-3">Privacy First</h3>
          <p className="text-sm text-gray-500">We don't store your input data. Calculations happen on-the-fly, and your privacy is our priority.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center"
        >
          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-[#1a1a2e] mb-3">Pure Speed</h3>
          <p className="text-sm text-gray-500">Optimized for performance. No heavy scripts, no trackers, just the results you need, instantly.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center"
        >
          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-[#1a1a2e] mb-3">100% Free</h3>
          <p className="text-sm text-gray-500">No hidden fees, no "premium" versions. Every tool in our studio is accessible to everyone, always.</p>
        </motion.div>
      </div>

      <div className="bg-[#1a1a2e] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-white mb-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066cc] opacity-10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            ToolStudio is an evolving project. We are constantly adding new tools based on user feedback. Our goal is to become the web's most trusted toolbox—functional, elegant, and ethically built.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/" 
              className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 group"
            >
              Start Using Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              Contact Us
              <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-400 text-sm italic">
        Made with <Heart className="w-4 h-4 inline text-red-500 mx-1 fill-red-500" /> by the ToolStudio Team.
      </div>
    </div>
  );
};
