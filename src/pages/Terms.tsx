import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Scale, Zap, Info } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Helmet>
        <title>Terms of Service - ToolStudio</title>
        <meta name="description" content="Terms of service for using ToolStudio. Understand our rules for using our free online tools." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black text-[#1a1a2e] mb-4 uppercase tracking-tight">Terms of Service</h1>
        <p className="text-gray-600 font-medium">Last updated: May 17, 2024</p>
      </motion.div>
      
      <div className="prose prose-lg max-w-none space-y-12 text-gray-600">
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">Free & Unrestricted Service</h2>
          </div>
          <p>
            ToolStudio provides a wide range of web-based tools completely free of charge. You are welcome to use these tools for personal, educational, or professional purposes. No registration is required, and there are no hidden fees. We ask that you use the service responsibly and do not attempt to disrupt the site's functionality through automated means or harmful code.
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">No Liability & Disclaimer</h2>
          </div>
          <p>
            The tools provided on ToolStudio are offered "as is" and "as available." While we strive for 100% accuracy in all calculations and conversions, we offer no warranties or guarantees regarding the precision of results. ToolStudio shall not be held liable for any damages, financial losses, or decisions made based on the output of our tools. Users should verify critical data with official sources.
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-[#0066cc]">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] m-0">Responsible Usage</h2>
          </div>
          <p>
            Users agree not to misuse our platform for illegal activities or to scrape our data for commercial resale. We reserve the right to limit access to our services if we detect abusive behavior that compromises the experience for other users. Our goal is to maintain a fast, clean environment for everyone.
          </p>
        </section>

        <div className="text-center pt-8">
          <p className="text-sm text-gray-500 font-medium">
            By continuing to use ToolStudio, you agree to these terms. If you do not agree, please discontinue use of the site.
          </p>
        </div>
      </div>
    </div>
  );
};
