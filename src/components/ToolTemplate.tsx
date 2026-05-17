import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORIES, Tool } from '@/src/data/tools';
import { toolMetadata } from '@/src/lib/toolMetadata';
import { relatedTools as relatedToolsData } from '@/src/lib/relatedTools';
import RelatedTools from './RelatedTools';
import { AdSpace } from './AdSpace';
import { useFavorites } from '@/src/context/FavoritesContext';
import { logPageView } from '@/src/lib/analytics';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Copy, Check, Star } from 'lucide-react';

export const ToolTemplate: React.FC = () => {
  const { category, toolId } = useParams<{ category: string; toolId: string }>();
  const location = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Normalize path for metadata lookup (remove trailing slash)
  const normalizedPath = location.pathname.endsWith('/') && location.pathname.length > 1 
    ? location.pathname.slice(0, -1) 
    : location.pathname;

  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<string | string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);

  const currentCategory = CATEGORIES.find((c) => c.id === category);
  const tool = currentCategory?.tools.find((t) => t.id === toolId);

  // Get metadata for the current tool
  const meta = toolMetadata[normalizedPath] || {
    title: `${tool?.name || 'Tool'} - ToolStudio`,
    description: tool?.description || 'Free online tool from ToolStudio.',
    keywords: 'online tool, free tool, converter, calculator'
  };

  const fullUrl = `https://toolstudio-395896226429.us-west1.run.app${location.pathname}`;
  const ogImageUrl = `https://toolstudio-395896226429.us-west1.run.app/og-image.png`;

  // Log pageview
  useEffect(() => {
    if (category && toolId) {
      logPageView(category, toolId, window.location.pathname);
    }
  }, [category, toolId]);

  // Initialize values
  useEffect(() => {
    if (tool) {
      const initial: Record<string, any> = {};
      tool.inputs.forEach((input) => {
        initial[input.id] = input.defaultValue ?? '';
      });
      setValues(initial);
      setResult(null);
      setError(null);
      setValidationErrors({});
    }
  }, [tool]);

  if (!tool || !currentCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold">Tool not found</h2>
        <Link to="/" className="text-[#0066cc] mt-4 hover:underline">Return Home</Link>
      </div>
    );
  }

  const handleInputChange = (id: string, value: any, type?: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    
    if (type === 'number') {
      const numValue = parseFloat(value);
      if (value === '' || value === undefined || value === null) {
        setValidationErrors(prev => ({ ...prev, [id]: 'Required' }));
      } else if (isNaN(numValue)) {
        setValidationErrors(prev => ({ ...prev, [id]: 'Invalid number' }));
      } else if (numValue <= 0) {
        setValidationErrors(prev => ({ ...prev, [id]: 'Must be a positive number (> 0)' }));
      } else {
        setValidationErrors(prev => ({ ...prev, [id]: null }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleCalculate = () => {
    try {
      setError(null);
      
      // Parse numbers before calculating
      const parsedValues = { ...values };
      tool.inputs.forEach(input => {
        if (input.type === 'number') {
          parsedValues[input.id] = parseFloat(values[input.id]);
        }
      });

      const res = tool.calculate(parsedValues);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An error occurred during calculation.');
      setResult(null);
    }
  };

  const hasValidationErrors = Object.values(validationErrors).some(error => error !== null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={ogImageUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      {/* Header */}
      <div className="mb-12 text-center relative">
        <div className="absolute right-0 top-0">
          <button
            onClick={() => toggleFavorite(category!, toolId!)}
            aria-label={isFavorite(category!, toolId!) ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "p-3 rounded-full border transition-all hover:scale-110 active:scale-95",
              isFavorite(category!, toolId!) 
                ? "bg-yellow-50 border-yellow-200 text-yellow-500" 
                : "bg-white border-gray-200 text-gray-400 hover:text-yellow-500 hover:border-yellow-200"
            )}
            title={isFavorite(category!, toolId!) ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={cn("w-6 h-6", isFavorite(category!, toolId!) && "fill-yellow-500")} />
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4 tracking-tight">{tool.name}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{tool.description}</p>
      </div>

      <AdSpace position="top" />

      {/* Tool Box */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="space-y-6">
          {tool.inputs.map((input) => (
            <div key={input.id}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {input.label}
              </label>
              
              {input.type === 'select' ? (
                <select
                  value={values[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={cn(
                    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] outline-none transition-all",
                    validationErrors[input.id] ? "border-red-500 bg-red-50" : "border-gray-300"
                  )}
                >
                  {input.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : input.type === 'textarea' ? (
                <textarea
                  value={values[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  placeholder={input.placeholder}
                  className={cn(
                    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] outline-none transition-all h-48 font-mono text-sm",
                    validationErrors[input.id] ? "border-red-500 bg-red-50" : "border-gray-300"
                  )}
                />
              ) : input.type === 'checkbox' ? (
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={values[input.id] || false}
                    onChange={(e) => handleInputChange(input.id, e.target.checked)}
                    className="w-5 h-5 text-[#0066cc] border-gray-300 rounded focus:ring-[#0066cc]"
                  />
                  <span className="text-sm text-gray-600">Enabled</span>
                </div>
              ) : input.type === 'date' ? (
                <input
                  type="date"
                  value={values[input.id] || ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className={cn(
                    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] outline-none transition-all",
                    validationErrors[input.id] ? "border-red-500 bg-red-50" : "border-gray-300"
                  )}
                />
              ) : (
                <input
                  type={input.type}
                  value={values[input.id] ?? ''}
                  onChange={(e) => handleInputChange(input.id, e.target.value, input.type)}
                  placeholder={input.placeholder}
                  className={cn(
                    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] outline-none transition-all",
                    validationErrors[input.id] ? "border-red-500 bg-red-50" : "border-gray-300"
                  )}
                />
              )}
              {validationErrors[input.id] && (
                <p className="text-red-500 text-xs mt-1 font-medium">{validationErrors[input.id]}</p>
              )}
            </div>
          ))}

          <button
            onClick={handleCalculate}
            disabled={hasValidationErrors}
            className={cn(
              "w-full font-bold py-4 rounded-lg transition-all shadow-md flex items-center justify-center space-x-2",
              hasValidationErrors 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70" 
                : "bg-[#0066cc] hover:bg-[#0052a3] text-white"
            )}
          >
            <span>{category === 'generators' ? 'Generate' : 'Calculate'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Result</h3>
                <button
                  onClick={() => copyToClipboard(Array.isArray(result) ? result.join('\n') : result)}
                  aria-label="Copy result to clipboard"
                  className="text-gray-500 hover:text-[#0066cc] transition-colors flex items-center space-x-1"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="text-xs font-medium">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="bg-[#f0f8ff] border-l-4 border-[#0066cc] p-6 rounded-r-xl">
                <pre className="text-xl font-bold whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {result}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AdSpace position="bottom" />

      {/* Internal Linking: Related Tools */}
      <RelatedTools tools={relatedToolsData[normalizedPath] || []} />
    </div>
  );
};
