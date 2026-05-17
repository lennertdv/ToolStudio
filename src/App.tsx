import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/Login';
import { AdminIndex } from './pages/admin/Index';
import { BlogHome } from './pages/BlogHome';
import { BlogPost } from './pages/BlogPost';
import { ToolTemplate } from './components/ToolTemplate';
import { FavoritesProvider } from './context/FavoritesContext';
import { GoogleAnalytics } from './components/GoogleAnalytics';

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <GoogleAnalytics />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
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
        </Layout>
      </Router>
    </FavoritesProvider>
  );
}
