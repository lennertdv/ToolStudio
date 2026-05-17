import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Shield, Lock, EyeOff } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Helmet>
        <title>Privacy Policy - ToolStudio</title>
        <meta name="description" content="Our commitment to your privacy. Learn how ToolStudio handles your data with transparency and care." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black text-[#1a1a2e] mb-4 uppercase tracking-tight">Privacy Policy</h1>
        <p className="text-gray-600 font-medium">Last updated: May 17, 2024</p>
      </motion.div>
      
      <div className="prose prose-lg max-w-none space-y-12 text-gray-600">
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <EyeOff className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">Zero Tracking of Personal Data</h2>
          </div>
          <p>
            At ToolStudio, we believe your data belongs to you. Our tools are designed to work entirely within your browser whenever possible. We do not require account creation, email registration, or any form of personal identification to use our services. We do not store, sell, or trade any personal data you input into our calculators, converters, or generators.
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">Aggregate Analytics</h2>
          </div>
          <p>
            To improve ToolStudio, we use Google Analytics to collect aggregate, non-identifying information about how our visitors use the site (e.g., which tools are most popular). This data helps us optimize performance and prioritize new features. This information is purely statistical and cannot be traced back to an individual user.
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">Cookie Usage</h2>
          </div>
          <p>
            We strive to minimize cookie usage. We do not use persistent tracking cookies for advertising. We use Local Storage specifically to save your "Favorite" tools locally on your device for your convenience. This data never leaves your computer and is not accessible by our team.
          </p>
        </section>

        <div className="text-center pt-8">
          <p className="text-sm text-gray-500 font-medium">
            By using ToolStudio, you consent to this privacy policy. If you have any questions, please reach out via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};
