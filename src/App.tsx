import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FavoritesProvider } from './context/FavoritesContext';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { Search } from 'lucide-react';

// Lazy load pages for better performance
const Favorites = lazy(() => import('./pages/Favorites').then(m => ({ default: m.Favorites })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const AdminLogin = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.AdminLogin })));
const AdminIndex = lazy(() => import('./pages/admin/Index').then(m => ({ default: m.AdminIndex })));
const BlogHome = lazy(() => import('./pages/BlogHome').then(m => ({ default: m.BlogHome })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const ToolTemplate = lazy(() => import('./components/ToolTemplate').then(m => ({ default: m.ToolTemplate })));

// Loading component for suspense
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
    <div className="mb-12">
      <span className="text-4xl font-black tracking-tighter">
        <span className="text-[#0066cc]">Tool</span><span className="text-[#1a1a2e]">Studio</span>
      </span>
    </div>
    <div className="relative">
      <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
      <div className="w-20 h-20 border-4 border-transparent border-t-[#0066cc] rounded-full animate-spin absolute top-0"></div>
    </div>
    <p className="mt-8 text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Preparing your workshop...</p>
  </div>
);

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <GoogleAnalytics />
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/:category/:toolId" element={<ToolTemplate />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                  <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-red-500">
                    <Search className="w-10 h-10" />
                  </div>
                  <h1 className="text-4xl font-black text-[#1a1a2e] mb-4">404 - Lost in the Studio?</h1>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    We couldn't find the page you're looking for. It might have been moved or doesn't exist. Try one of our popular tools below instead!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-12">
                    <Link to="/calculators/bmi" className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all font-bold text-[#1a1a2e]">BMI Calculator</Link>
                    <Link to="/generators/password" className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all font-bold text-[#1a1a2e]">Password Generator</Link>
                    <Link to="/converters/currency" className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all font-bold text-[#1a1a2e]">Currency Converter</Link>
                    <Link to="/converters/length" className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all font-bold text-[#1a1a2e]">Length Converter</Link>
                  </div>
                  <Link to="/" className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-colors shadow-lg shadow-[#0066cc]/20">
                    Return to Homepage
                  </Link>
                </div>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </FavoritesProvider>
  );
}
