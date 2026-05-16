import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-[#1a1a2e] mb-8 uppercase tracking-tight">Privacy Policy</h1>
      
      <div className="prose prose-blue max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">1. Data Collection</h2>
          <p>
            At ToolStudio, we prioritize your privacy. We do not store any personal data entered into our tools on our servers. 
            All calculations and data processing happen entirely within your browser (client-side).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">2. Usage Analytics</h2>
          <p>
            We use anonymous tracking (Firebase Analytics) to understand which tools are most popular and how users interact 
            with our site. This data is aggregated and does not contain personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">3. Cookies</h2>
          <p>
            We use local storage to save your favorites and settings. This stays on your device and is not 
            accessible by us. We may use standard cookies for site functionality and analytics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">4. Third Parties</h2>
          <p>
            We may display advertisements from third-party networks. These providers may use cookies to serve 
            ads based on your prior visits to this or other websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">5. Contact</h2>
          <p>
            If you have questions about this policy, please contact us via our support channels.
          </p>
          <p className="mt-8 text-sm text-gray-400 italic">Last updated: May 2024</p>
        </section>
      </div>
    </div>
  );
};
