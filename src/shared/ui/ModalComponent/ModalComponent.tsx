import React, { ReactNode } from 'react';
import { Modal } from 'antd';

interface Props {
  title?: string;
  width?: string | number;
  closeIcon?: boolean;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  children: ReactNode;
  className?: string;
}

const ModalComponent: React.FC<Props> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  closeIcon = false,
  children,
  title,
  width,
  className,
}) => {
  return (
    <Modal
      width={width}
      closeIcon={closeIcon}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className={className}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
