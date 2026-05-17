import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FavoritesProvider } from './context/FavoritesContext';
import { GoogleAnalytics } from './components/GoogleAnalytics';

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
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#0066cc] rounded-full animate-spin"></div>
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
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                  <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                  <a href="/" className="text-[#0066cc] mt-4 hover:underline">Return Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </FavoritesProvider>
  );
}
