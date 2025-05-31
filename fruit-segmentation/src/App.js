import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import URLInput from './components/URLInput';
import ImageCanvas from './components/ImageCanvas';
import ClassStats from './components/ClassStats';
import FruitInfoModal from './components/FruitInfoModal';
import fruitData from './data/fruitData.json';
import './index.css';

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFruit, setSelectedFruit] = useState(null);

  useEffect(() => {
    const lastResult = localStorage.getItem('lastResult');
    if (lastResult) {
      try {
        const { imageSrc: storedImageSrc, predictions: storedPredictions } = JSON.parse(lastResult);
        setImageSrc(storedImageSrc);
        setPredictions(storedPredictions || []);
      } catch (e) {
        console.error("Failed to parse last result from localStorage", e);
        localStorage.removeItem('lastResult');
      }
    }
  }, []);

  const processImage = async (imageData) => {
    setIsLoading(true);
    setError(null);
    setImageSrc(null);
    setPredictions([]);
    setSelectedFruit(null);

    try {
      const imageInput = { type: imageData.startsWith('data:') ? 'base64' : 'url', value: imageData };

      const response = await fetch('https://serverless.roboflow.com/infer/workflows/wisd-team/fruits-segmentation-v2', {
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

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const fruitPredictions = result.outputs?.[0]?.predictions?.predictions || [];

      setPredictions(fruitPredictions);
      setImageSrc(imageData);
      localStorage.setItem('lastResult', JSON.stringify({ imageSrc: imageData, predictions: fruitPredictions }));

    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFruitSelect = (fruitName) => {
    setSelectedFruit(fruitData[fruitName] || null);
  };

  const handleCloseModal = () => {
    setSelectedFruit(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
              Fruit Vision AI
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-neutral-600">
            <p className="text-base md:text-lg">
              <span className="font-medium text-primary-600">Upload</span> an image or <span className="font-medium text-accent-600">enter a URL</span>
            </p>
            <span className="hidden md:inline text-neutral-400">•</span>
            <p className="text-base md:text-lg">
              <span className="font-medium text-secondary-600">Detect</span> and <span className="font-medium text-primary-600">segment</span> fruits
            </p>
            <span className="hidden md:inline text-neutral-400">•</span>
            <p className="text-base md:text-lg">
              Get <span className="font-medium text-accent-600">nutritional info</span> and <span className="font-medium text-secondary-600">fun facts</span>
            </p>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-soft p-4 mb-12 animate-slide-up">
          <div className="space-y-8 md:space-y-0 md:flex md:space-x-8 items-center">
            <div className="flex-1">
              <ImageUploader onImageSelected={processImage} />
            </div>
            <div className="md:w-auto flex items-center">
              <div className="hidden md:block mx-4 text-neutral-400 font-medium">or</div>
              <div className="w-full md:w-auto">
                <URLInput onURLSubmit={processImage} />
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
            <p className="text-lg text-neutral-600 font-medium">Analyzing your fruits...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-xl mb-12 animate-fade-in">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {imageSrc && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-display font-semibold text-neutral-800">Fruit Detection</h2>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium">
                  {predictions.length} {predictions.length === 1 ? 'fruit' : 'fruits'} detected
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <ImageCanvas imageSrc={imageSrc} predictions={predictions} onFruitSelect={handleFruitSelect} />
              </div>
            </div>
            <div>
              <ClassStats predictions={predictions} onFruitSelect={handleFruitSelect} />
            </div>
          </div>
        )}
      </div>

      {selectedFruit && (
        <FruitInfoModal fruit={selectedFruit} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;

