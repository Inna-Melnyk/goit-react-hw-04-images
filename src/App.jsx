import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { fetchImages } from './api/index';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  useEffect(() => {
    if (query !== '') {
      setLoading(true);
      setHasMoreImages(false);
      fetchImages({ query, pageNumber: page })
        .then(data => {
          if (!data.hits.length) {
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          if (data.hits.length < 12) {
            toast.warn(`That's the lest batch of pictures`);
          }

          setImages(prevImages => [...prevImages, ...data.hits]);
          setLoading(false);
          setHasMoreImages(data.hits.length >= 12);
        })
        .catch(message => {
          toast.error(`Sorry, there is no more picture`);
        })
        .finally(() => setLoading(false));
    }
  }, [query, page]);

  const handleOnSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleOnClickMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleOnSubmit} />

      <ImageGallery
        images={images}
        isLoading={loading}
        hasMoreImages={hasMoreImages}
        onClickMoreImages={handleOnClickMoreImages}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
