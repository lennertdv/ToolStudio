import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../lib/blogPosts';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-8">The blog article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="text-[#0066cc] font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{post.title} - ToolStudio Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-[#0066cc] transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        All Articles
      </Link>

      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-[#1a1a2e] mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-2 text-[#0066cc] font-bold">
            <User className="w-4 h-4" />
            {post.author}
          </span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none prose-headings:text-[#1a1a2e] prose-headings:font-bold prose-p:text-gray-600 prose-a:text-[#0066cc] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0066cc] blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Related Tool CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-16 bg-[#0066cc]/5 border-2 border-[#0066cc]/10 rounded-3xl p-8 text-center"
      >
        <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">Ready to use this knowledge?</h3>
        <p className="text-gray-600 mb-6">Test your numbers or generate what you need with our free tool.</p>
        <Link 
          to={post.relatedTool}
          className="inline-flex items-center px-8 py-4 bg-[#0066cc] text-white font-bold rounded-2xl hover:bg-[#0052a3] transition-colors shadow-lg shadow-[#0066cc]/20"
        >
          Try the {post.relatedToolName}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>

      {/* Internal Links: Other Posts */}
      <div className="mt-20 border-t border-gray-100 pt-12">
        <h3 className="text-2xl font-bold text-[#1a1a2e] mb-8">Other Read-worthy Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map(other => (
            <Link 
              key={other.slug}
              to={`/blog/${other.slug}`}
              className="group"
            >
              <h4 className="text-lg font-bold text-[#1a1a2e] mb-2 group-hover:text-[#0066cc] transition-colors line-clamp-1">
                {other.title}
              </h4>
              <p className="text-sm text-gray-500 line-clamp-2">{other.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};
