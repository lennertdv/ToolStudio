import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/tools';
import { useFavorites } from '@/src/context/FavoritesContext';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  const favoriteTools = favorites.map(favId => {
    const [catId, toolId] = favId.split(':');
    const category = CATEGORIES.find(c => c.id === catId);
    const tool = category?.tools.find(t => t.id === toolId);
    if (!category || !tool) return null;
    return { category, tool };
  }).filter(t => t !== null) as { category: typeof CATEGORIES[0], tool: typeof CATEGORIES[0]['tools'][0] }[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4 tracking-tight">Your Favorites</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Quickly access the tools you use most often.</p>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Star className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-8">Start adding tools to your favorites by clicking the star icon on any tool page.</p>
          <Link to="/" className="inline-flex items-center space-x-2 bg-[#0066cc] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0052a3] transition-colors">
            <span>Explore Tools</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favoriteTools.map(({ category, tool }) => (
            <motion.div
              key={`${category.id}:${tool.id}`}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Link
                to={`/${category.id}/${tool.id}`}
                className="bg-white p-6 block rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#f0f8ff] w-12 h-12 rounded-lg flex items-center justify-center text-[#0066cc]">
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] text-lg mb-1">{tool.name}</h3>
                <p className="text-xs text-[#0066cc] font-semibold uppercase tracking-wider mb-2">{category.name}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
