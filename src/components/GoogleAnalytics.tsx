import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Google Analytics Measurement ID is missing. Set VITE_GA_MEASUREMENT_ID in your .env file.');
      }
      return;
    }

    // Load gtag.js script if not already loaded
    if (!window.gtag) {
      const loadGA = () => {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);
      };

      // Defer loading slightly to prioritize main content
      if (document.readyState === 'complete') {
        setTimeout(loadGA, 1000);
      } else {
        window.addEventListener('load', () => setTimeout(loadGA, 1000));
      }
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};
