import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onAddToCart: (project: Project) => void;
  isMobile?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAddToCart,
  isMobile = false,
}) => {
  return (
    <div
      className={`bg-white flex rounded-lg shadow-md overflow-hidden mb-4 ${
        isMobile ? 'flex' : ''
      }`}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className={
          isMobile ? 'w-1/3 h-24 object-cover' : 'w-1/3 h-48 object-cover'
        }
      />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        {!isMobile && (
          <p className="text-gray-600 mb-4">{project.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">{project.category}</span>
            {isMobile && (
              <p className="text-xs text-gray-400 mt-1">
                Oleh: {project.author}
              </p>
            )}
          </div>
          <button
            onClick={() => onAddToCart(project)}
            className="px-4 py-2 bg-[#F0AD4E] text-white rounded-md hover:bg-[#EC971F] transition-colors"
          >
            {isMobile ? 'A' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
