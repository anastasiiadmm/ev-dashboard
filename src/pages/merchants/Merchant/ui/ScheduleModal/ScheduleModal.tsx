import { Button } from 'antd';
import bem from 'easy-bem';
import React from 'react';

// import { ModalComponent, TableComponent } from '~/shared/ui';
import './ScheduleModal.scss';

interface Props {
  handleOkCancel: () => void;
}

const ScheduleModal: React.FC<Props> = ({ handleOkCancel }) => {
  const b = bem('ScheduleModal');
  return (
    <div>
      {/*<TableComponent data={} columns={} rowKey={} rowSelection={} loading={} />*/}
      <Button className={b('save-schedule')} type='primary' onClick={handleOkCancel}>
        Сохранить
      </Button>
    </div>
  );
};

export default ScheduleModal;
