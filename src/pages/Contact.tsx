import React, { useState } from 'react';
import { Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to a backend
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4 uppercase tracking-tight">Contact Us</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Have a suggestion for a new tool? Found a bug? Just want to say hi? 
          We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#f0f8ff] p-3 rounded-lg text-[#0066cc]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a2e]">Email</h3>
              <p className="text-sm text-gray-500">support@toolstudio.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-[#f0f8ff] p-3 rounded-lg text-[#0066cc]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#1a1a2e]">Social</h3>
              <p className="text-sm text-gray-500">@toolstudio_dev</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-100 p-10 rounded-[2.5rem] text-center shadow-xl shadow-blue-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066cc]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-[#1a1a2e] mb-4">Message Received!</h2>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Our team usually responds within 24-48 business hours. In the meantime, feel free to explore our most popular tools!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <Link to="/calculators/bmi" className="px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-bold text-[#1a1a2e] transition-colors border border-gray-100">BMI Calculator</Link>
                <Link to="/converters/currency" className="px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-bold text-[#1a1a2e] transition-colors border border-gray-100">Currency Converter</Link>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Link to="/" className="text-[#0066cc] font-bold hover:underline flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Return to Homepage
                </Link>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-[#1a1a2e] transition-colors"
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full border-b-2 border-gray-100 focus:border-[#0066cc] outline-none py-2 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full border-b-2 border-gray-100 focus:border-[#0066cc] outline-none py-2 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full border-b-2 border-gray-100 focus:border-[#0066cc] outline-none py-2 transition-colors resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
