import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/tools';
import { AdSpace } from '@/src/components/AdSpace';
import { useFavorites } from '@/src/context/FavoritesContext';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Shield, Search, Star } from 'lucide-react';

export const Home: React.FC = () => {
  const { favorites } = useFavorites();

  const favoriteTools = favorites.map(favId => {
    const [catId, toolId] = favId.split(':');
    const category = CATEGORIES.find(c => c.id === catId);
    const tool = category?.tools.find(t => t.id === toolId);
    if (!category || !tool) return null;
    return { category, tool };
  }).filter(t => t !== null) as { category: typeof CATEGORIES[0], tool: typeof CATEGORIES[0]['tools'][0] }[];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1a1a2e] to-[#16213e] py-16 px-4 text-center text-white border-b border-[#0066cc]/20">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[3rem] font-bold leading-tight mb-4 tracking-tight"
          >
            Free Online Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Convert, calculate, and generate. All free, no signup required.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 mt-8"
          >
            <button className="px-6 py-2.5 bg-[#0066cc] hover:bg-[#0052a3] rounded-lg text-sm font-bold shadow-xl transition-all">
              Popular Tools
            </button>
            <button className="px-6 py-2.5 bg-transparent border border-white/20 hover:border-[#00d4ff] rounded-lg text-sm font-medium transition-all">
              Recently Added
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-4 py-12">
        <AdSpace position="top" />

        {favoriteTools.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[#0066cc] font-bold text-xs tracking-widest uppercase border-b border-gray-200 pb-2 mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Your Favorites</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTools.map(({ category, tool }) => (
                <Link
                  key={`fav-${category.id}:${tool.id}`}
                  to={`/${category.id}/${tool.id}`}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex items-start space-x-4"
                >
                  <div className="bg-[#f0f8ff] w-10 h-10 rounded-lg flex items-center justify-center text-[#0066cc] shrink-0">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a2e]">{tool.name}</h3>
                    <p className="text-[10px] text-[#0066cc] font-semibold uppercase tracking-wider">{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              id={cat.id}
              className="space-y-4"
            >
              <h3 className="text-[#0066cc] font-bold text-xs tracking-widest uppercase border-b border-gray-200 pb-2">
                {cat.name}
              </h3>
              <ul className="text-[14px] space-y-2.5">
                {cat.tools.map((tool) => (
                  <li key={tool.id}>
                    <Link 
                      to={`/${cat.id}/${tool.id}`}
                      className="group flex items-center gap-2 hover:text-[#0066cc] transition-colors"
                    >
                      <span className="opacity-40">•</span>
                      <span className="group-hover:translate-x-1 transition-transform inline-block">
                        {tool.name}
                      </span>
                      {tool.id === 'bmi' && <span className="text-[10px] bg-blue-100 text-[#0066cc] px-1.5 rounded font-bold">HOT</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <AdSpace position="bottom" />

        {/* Features Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">How it works</h2>
            <div className="w-20 h-1 bg-[#0066cc] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[#f0f8ff] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]"
              >
                <Search className="w-8 h-8" />
              </motion.div>
              <h3 className="font-bold text-xl mb-3">1. Choose Tool</h3>
              <p className="text-gray-500 text-sm">Select from our wide range of converters, calculators, and generators.</p>
            </div>
            <div className="text-center group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[#f0f8ff] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]"
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <h3 className="font-bold text-xl mb-3">2. Enter Data</h3>
              <p className="text-gray-500 text-sm">Input your values and see real-time updates or instant calculations.</p>
            </div>
            <div className="text-center group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-[#f0f8ff] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0066cc]"
              >
                <Shield className="w-8 h-8" />
              </motion.div>
              <h3 className="font-bold text-xl mb-3">3. Get Result</h3>
              <p className="text-gray-500 text-sm">Get your accurate result instantly. No data is stored on our servers.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
