import React from 'react';
import { Modal } from 'antd';

interface Props {
  title?: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  children: React.FC;
}

const ModalComponent: React.FC<Props> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
}) => {
  return (
    <Modal
      closeIcon={false}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
