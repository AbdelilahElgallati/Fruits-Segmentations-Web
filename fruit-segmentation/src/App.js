// import React, { useState, useEffect } from 'react';
// import ImageUploader from './components/ImageUploader';
// import URLInput from './components/URLInput';
// import ImageCanvas from './components/ImageCanvas';
// import ClassStats from './components/ClassStats';
// import './index.css';

// const App = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Load last result from localStorage on mount
//   useEffect(() => {
//     const lastResult = localStorage.getItem('lastResult');
//     if (lastResult) {
//       const { imageSrc, predictions } = JSON.parse(lastResult);
//       setImageSrc(imageSrc);
//       setPredictions(predictions);
//     }
//   }, []);

//   // Process image with Roboflow API
//   const processImage = async (imageData) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const imageInput = { type: imageData.startsWith('data:') ? 'base64' : 'url', value: imageData };

//       const response = await fetch('https://detect.roboflow.com/infer/workflows/wisd-team/custom-workflow-2', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           api_key: 'QWWUQhqLvvpzOoFe7CP7',
//           inputs: {
//             image: imageInput
//           }
//         })
//       });

//       const result = await response.json();
//       const fruitPredictions = result.outputs?.[0]?.predictions?.predictions || [];

//       setPredictions(fruitPredictions);
//       setImageSrc(imageData);

//       // Save to localStorage
//       localStorage.setItem('lastResult', JSON.stringify({ imageSrc: imageData, predictions: fruitPredictions }));
//     } catch (err) {
//       setError('Failed to process image. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container py-12">
//       <header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-dark)] mb-4 fade-in">
//           Fruit Segmentation App
//         </h1>
//         <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto fade-in">
//           Upload an image or enter a URL to detect and segment fruits with a fun, interactive experience!
//         </p>
//       </header>

//       <div className="card mb-12 fade-in">
//         <div className="space-y-6 md:space-y-0 md:flex md:space-x-6 items-center">
//           <div className="flex-1">
//             <ImageUploader onImageSelected={processImage} />
//           </div>
//           <div className="md:w-auto">
//             <URLInput onURLSubmit={processImage} />
//           </div>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="flex justify-center items-center py-12">
//           <div className="loading-spinner"></div>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-12 fade-in">
//           {error}
//         </div>
//       )}

//       {imageSrc && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in">
//           <div className="lg:col-span-2">
//             <ImageCanvas imageSrc={imageSrc} predictions={predictions} />
//           </div>
//           <div>
//             <ClassStats predictions={predictions} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import URLInput from './components/URLInput';
import ImageCanvas from './components/ImageCanvas';
import ClassStats from './components/ClassStats';
import './index.css';

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lastResult = localStorage.getItem('lastResult');
    if (lastResult) {
      const { imageSrc, predictions } = JSON.parse(lastResult);
      setImageSrc(imageSrc);
      setPredictions(predictions);
    }
  }, []);

  const processImage = async (imageData) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageInput = { type: imageData.startsWith('data:') ? 'base64' : 'url', value: imageData };

      const response = await fetch('https://detect.roboflow.com/infer/workflows/wisd-team/custom-workflow-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: 'QWWUQhqLvvpzOoFe7CP7',
          inputs: {
            image: imageInput
          }
        })
      });

      const result = await response.json();
      const fruitPredictions = result.outputs?.[0]?.predictions?.predictions || [];

      setPredictions(fruitPredictions);
      setImageSrc(imageData);
      localStorage.setItem('lastResult', JSON.stringify({ imageSrc: imageData, predictions: fruitPredictions }));
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="text-center mb-12">
        <div className="inline-block mb-6">
          <div className="bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-yellow)] p-3 rounded-full shadow-lg float-animation">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-dark)] mb-4 fade-in bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-orange)] to-[var(--accent-purple)]">
          Fruit Vision
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto fade-in">
          Upload an image or enter a URL to detect and segment fruits with our interactive analyzer!
        </p>
      </header>

      <div className="card mb-12 fade-in">
        <div className="space-y-6 md:space-y-0 md:flex md:space-x-6 items-center">
          <div className="flex-1">
            <ImageUploader onImageSelected={processImage} />
          </div>
          <div className="md:w-auto flex items-center">
            <div className="hidden md:block mx-4 text-[var(--text-muted)]">or</div>
            <div className="w-full md:w-auto">
              <URLInput onURLSubmit={processImage} />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="loading-spinner"></div>
          <p className="text-[var(--text-muted)]">Analyzing your fruits...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-12 fade-in">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in">
          <div className="lg:col-span-2">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[var(--text-dark)]">Fruit Detection</h2>
              <span className="fruit-badge">
                {predictions.length} {predictions.length === 1 ? 'fruit' : 'fruits'} detected
              </span>
            </div>
            <ImageCanvas imageSrc={imageSrc} predictions={predictions} />
          </div>
          <div>
            <ClassStats predictions={predictions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;