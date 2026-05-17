import React from 'react';
import { Link } from 'react-router-dom';
import { RelatedTool } from '../lib/relatedTools';

interface RelatedToolsProps {
  tools: RelatedTool[];
}

const RelatedTools: React.FC<RelatedToolsProps> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="related-tools">
      <h3>You might also like:</h3>
      <div className="related-tools-grid">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            to={tool.path} 
            className="related-tool-card"
          >
            <h4>{tool.name}</h4>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTools;
