import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { AdminLogin } from './pages/admin/Login';
import { AdminIndex } from './pages/admin/Index';
import { ToolTemplate } from './components/ToolTemplate';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
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
