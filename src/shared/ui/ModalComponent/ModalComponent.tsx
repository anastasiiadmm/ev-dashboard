import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface Props {
  title?: string;
  width?: number;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  children: ReactNode;
}

const ModalComponent: React.FC<Props> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
  width,
}) => {
  return (
    <Modal
      width={width}
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
