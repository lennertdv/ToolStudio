import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../lib/blogPosts';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const BlogHome: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Helmet>
        <title>Blog - ToolStudio | Free Online Tool Tips & Guides</title>
        <meta name="description" content="Explore the ToolStudio blog for comprehensive guides on using our tools, understanding exchange rates, health metrics, security tips, and more." />
      </Helmet>

      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4"
        >
          ToolStudio <span className="text-[#0066cc]">Blog</span>
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Expert guides, tips, and tutorials to help you make the most of our online tools and understand the data behind them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex h-full"
          >
            <Link 
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden h-full"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#0066cc] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                
                <div className="mt-auto flex items-center text-[#0066cc] font-bold text-sm">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">New articles coming soon. Stay tuned!</p>
        </div>
      )}
    </div>
  );
};
