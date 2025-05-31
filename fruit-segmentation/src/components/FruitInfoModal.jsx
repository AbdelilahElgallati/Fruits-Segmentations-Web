import React from 'react';

const FruitInfoModal = ({ fruit, onClose }) => {
  if (!fruit) return null;

  const { name, nutrition, fun_facts, icon } = fruit;

  return (
    <div 
      className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-soft w-full max-w-md p-8 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 p-2 rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="relative mr-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
            <span className="text-5xl relative">{icon}</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-neutral-800 capitalize">{name}</h2>
        </div>

        {/* Nutrition Section */}
        <div className="mb-8">
          <h3 className="text-xl font-display font-semibold text-primary-600 mb-4 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Nutritional Info (per 100g)
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(nutrition).map(([key, value]) => (
              <div 
                key={key} 
                className="flex justify-between items-center py-2 px-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
              >
                <span className="font-medium capitalize text-sm text-neutral-700">
                  {key.replace('_', ' ')}
                </span>
                <span className="text-sm font-semibold text-primary-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div>
          <h3 className="text-xl font-display font-semibold text-accent-600 mb-4 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            Fun Facts!
          </h3>
          <ul className="space-y-3">
            {fun_facts.map((fact, index) => (
              <li 
                key={index} 
                className="text-neutral-600 leading-relaxed pl-4 border-l-2 border-accent-200 hover:border-accent-400 transition-colors duration-200"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Add keyframes for modal animation in index.css or App.css if needed
/*
@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-enter {
  animation: modalEnter 0.3s ease-out forwards;
}
*/

export default FruitInfoModal;

