import { useState } from 'react';

const UseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const showModal = ({ title, content }) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    isModalOpen,
    modalTitle,
    modalContent,
    showModal,
    handleOkCancel,
  };
};

export default UseModal;
