import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageSelected }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onImageSelected(reader.result);
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] }, 
    maxFiles: 1 
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
    >
      <input {...getInputProps()} />
      <p className="text-xl text-[var(--text-dark)] font-semibold mb-2">
        {isDragActive ? 'Drop the image here!' : 'Drag & drop an image or click to select one'}
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        Supports JPEG, PNG, and other image formats
      </p>
    </div>
  );
};

export default ImageUploader;