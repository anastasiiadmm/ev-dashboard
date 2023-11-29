import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    showModal,
    handleOkCancel,
    openModal,
    closeModal,
  };
};

export default useModal;
