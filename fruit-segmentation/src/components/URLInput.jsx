import React, { useState } from 'react';

const URLInput = ({ onURLSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) onURLSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter image URL"
        className="input-field"
      />
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
};

export default URLInput;