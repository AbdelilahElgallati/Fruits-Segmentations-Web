import React, { useState } from 'react';

const URLInput = ({ onURLSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter an image URL');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('URL must start with http:// or https://');
      return;
    }

    onURLSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Enter image URL (http/https)"
              className={`
                w-full px-4 py-3 pr-12
                bg-white
                border rounded-xl
                text-neutral-700
                placeholder-neutral-400
                transition-all duration-200
                focus:outline-none focus:ring-2
                ${error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-neutral-200 focus:border-primary-400 focus:ring-primary-100'
                }
              `}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${error ? 'text-red-400' : 'text-neutral-400'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                />
              </svg>
            </div>
          </div>

          <button 
            type="submit" 
            className={`
              ml-3 px-6 py-3
              bg-gradient-to-r from-primary-500 to-accent-500
              text-white font-medium
              rounded-xl
              shadow-soft
              transition-all duration-200
              hover:shadow-hover
              hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              whitespace-nowrap
            `}
            disabled={!url.trim()}
          >
            Analyze URL
          </button>
        </div>

        {error && (
          <div className="mt-2 flex items-center text-sm text-red-600 animate-fade-in">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default URLInput;

