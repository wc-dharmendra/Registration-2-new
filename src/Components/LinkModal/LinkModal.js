import React, { useState } from 'react';

function LinkModal({ onLinkSubmit, onClose }) {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    onLinkSubmit(url); // Pass the URL to onLinkSubmit function
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <input 
          type="text" 
          className='input'
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter URL" 
        />
        <button onClick={handleSubmit}>Insert Link</button>
      </div>
    </div>
  );
}

export default LinkModal;
