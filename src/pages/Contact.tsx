import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'motion/react';

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
              className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h2>
              <p className="text-green-700">Thanks for reaching out. We'll get back to you soon.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-green-800 font-bold underline"
              >
                Send another message
              </button>
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
