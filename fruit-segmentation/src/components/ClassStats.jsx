import React from 'react';
import fruitData from '../data/fruitData.json'; // Assuming fruitData.json is in src/data

const ClassStats = ({ predictions, onFruitSelect }) => {
  if (!predictions || !Array.isArray(predictions)) {
    return (
      <div className="bg-white rounded-2xl shadow-soft p-6 h-full animate-fade-in">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-6">Detected Fruits</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-neutral-400 relative" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <p className="text-lg text-neutral-600 font-medium">No fruits detected yet!</p>
          <p className="text-sm text-neutral-500 mt-2">Upload an image to get started</p>
        </div>
      </div>
    );
  }

  const classCounts = predictions.reduce((acc, pred) => {
    const fruitName = pred.class.toLowerCase();
    acc[fruitName] = (acc[fruitName] || 0) + 1;
    return acc;
  }, {});

  const getFruitIcon = (fruitName) => {
    return fruitData[fruitName]?.icon || fruitData.default.icon;
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 h-full animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-6">Fruit Breakdown</h2>
      
      {Object.keys(classCounts).length > 0 ? (
        <ul className="space-y-3">
          {Object.entries(classCounts).map(([className, count], index) => (
            <li 
              key={className}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => onFruitSelect(className)}
                className="
                  w-full text-left
                  flex justify-between items-center
                  bg-white
                  p-4 rounded-xl
                  border border-neutral-100
                  shadow-soft
                  transition-all duration-200
                  hover:shadow-hover
                  hover:scale-[1.02]
                  hover:border-primary-100
                  focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
                  group
                "
                aria-label={`View details for ${className}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-3xl relative">{getFruitIcon(className)}</span>
                  </div>
                  <span className="font-medium capitalize text-neutral-700 group-hover:text-primary-600 transition-colors duration-200">
                    {className}
                  </span>
                </div>
                
                <span className="
                  px-3 py-1
                  bg-primary-100
                  text-primary-700
                  rounded-full
                  text-sm font-medium
                  transition-all duration-200
                  group-hover:bg-primary-200
                ">
                  {count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-neutral-400 relative" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <p className="text-lg text-neutral-600 font-medium">No fruits detected</p>
          <p className="text-sm text-neutral-500 mt-2">Try another image</p>
        </div>
      )}
    </div>
  );
};

export default ClassStats;

