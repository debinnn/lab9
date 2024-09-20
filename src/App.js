import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch agricultural images
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: 'agriculture', per_page: 10 },
          headers: {
            Authorization: 'Client-ID 5cgFu4VxgY9XdDE2VY8hfPZSrTqBoLvLfxBadtMjclI',
          },
        });
        setImages(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching images.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="App">
      <h1>Agriculture Images</h1>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
