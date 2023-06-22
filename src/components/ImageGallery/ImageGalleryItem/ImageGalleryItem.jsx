import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { Wrap } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, tags, largeImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Wrap>
      <img src={image} alt={tags} width="240" onClick={openModal} />

      {isOpen && (
        <Modal
          imageName={tags}
          url={largeImage}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </Wrap>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
