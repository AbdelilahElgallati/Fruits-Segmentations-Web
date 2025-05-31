import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageSelected }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onImageSelected(reader.result);
        } else {
          console.error('FileReader result is not a string:', reader.result);
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp'] },
    maxFiles: 1 
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative group
        border-2 border-dashed rounded-2xl p-8
        text-center cursor-pointer
        transition-all duration-300 ease-in-out
        bg-white hover:bg-primary-50
        min-h-[200px] sm:min-h-[250px]
        flex flex-col items-center justify-center
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50 ring-4 ring-primary-100 scale-[1.02]' 
          : 'border-neutral-200 hover:border-primary-400'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="relative">
        <div className={`
          absolute inset-0
          bg-gradient-to-r from-primary-500 to-accent-500
          rounded-full opacity-0 group-hover:opacity-10
          transition-opacity duration-300
          blur-xl
        `} />
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`
            h-16 w-16 mb-4
            transition-all duration-300
            ${isDragActive 
              ? 'text-primary-500 scale-110' 
              : 'text-neutral-400 group-hover:text-primary-500'
            }
          `} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
          />
        </svg>
      </div>

      <div className="space-y-2">
        <p className={`
          text-lg sm:text-xl font-display font-semibold
          transition-colors duration-300
          ${isDragActive ? 'text-primary-600' : 'text-neutral-700 group-hover:text-primary-600'}
        `}>
          {isDragActive ? 'Drop the image here!' : 'Drag & drop or click to upload'}
        </p>
        
        <p className="text-sm text-neutral-500">
          Supports JPEG, PNG, GIF, WEBP, BMP
        </p>
      </div>

      <div className={`
        absolute inset-0 rounded-2xl
        bg-gradient-to-r from-primary-500/0 to-accent-500/0
        group-hover:from-primary-500/5 group-hover:to-accent-500/5
        transition-all duration-300
        pointer-events-none
      `} />
    </div>
  );
};

export default ImageUploader;

