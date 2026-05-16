import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8 uppercase tracking-tight">Terms of Service</h1>
      
      <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing ToolStudio, you agree to be bound by these terms of service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">2. Use License</h2>
          <p>
            Permission is granted to use our web tools for personal or commercial use. This is the grant of a license, 
            not a transfer of title.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">3. Disclaimer</h2>
          <p>
            The materials on ToolStudio are provided on an 'as is' basis. ToolStudio makes no warranties, 
            expressed or implied, and hereby disclaims and negates all other warranties including, 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">4. Limitations</h2>
          <p>
            In no event shall ToolStudio be liable for any damages (including, without limitation, damages for loss 
            of data or profit, or due to business interruption) arising out of the use or inability to use the tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of your jurisdiction.
          </p>
          <p className="mt-8 text-sm text-gray-400 italic">Last updated: May 2024</p>
        </section>
      </div>
    </div>
  );
};
