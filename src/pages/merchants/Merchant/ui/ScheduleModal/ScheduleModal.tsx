import { Button } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import bem from 'easy-bem';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IColumn, ICreateSchedule } from '~/pages/merchants/interfaces';
import { TableComponent, TimePicker } from '~/shared/ui';

import './ScheduleModal.scss';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  handleOkCancel: () => void;
}

const schedule: ICreateSchedule[] = [
  {
    id: 1,
    day: 1,
    start_time: '10:15:22Z',
    end_time: '18:15:22Z',
    is_break: false,
  },
  {
    id: 2,
    day: 2,
    start_time: '00:15:22Z',
    end_time: '23:15:22Z',
    is_break: false,
  },
  {
    id: 3,
    day: 3,
    start_time: '14:15:22Z',
    end_time: '14:15:22Z',
    is_break: false,
  },
  {
    id: 4,
    day: 4,
    start_time: '14:15:22Z',
    end_time: '14:15:22Z',
    is_break: false,
  },
  {
    id: 5,
    day: 5,
    start_time: '00:15:22Z',
    end_time: '21:15:22Z',
    is_break: false,
  },
  {
    id: 6,
    day: 6,
    start_time: '00:00:00Z',
    end_time: '23:45:00Z',
    is_break: false,
  },
  {
    id: 7,
    day: 0,
    start_time: '',
    end_time: '',
    is_break: false,
  },
];

const ScheduleModal: React.FC<Props> = ({ handleOkCancel }) => {
  const b = bem('ScheduleModal');
  const { t } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [schedules, setSchedules] = useState(schedule);

  const addBreak = (day: number, id: number) => {
    const newSchedules = [...schedules];
    const newSchedule = {
      id: id + 7,
      day: day,
      start_time: '',
      end_time: '',
      is_break: true,
    };
    const indexDay = newSchedules.findIndex((item) => item.day === day);
    if (indexDay !== -1) {
      newSchedules[indexDay]?.break?.push(newSchedule);
    }
    setSchedules(newSchedules);
  };

  const columns: IColumn[] = [
    {
      title: t('merchants.all_days'),
      width: 100,
      render: (record: ICreateSchedule) => {
        return (
          <div className={b('block')}>
            <span>{record.is_break ? 'Перерыв' : dayjs().day(record.day).format('dddd')}</span>
          </div>
        );
      },
    },
    {
      title: t('merchants.time'),
      render: (record: ICreateSchedule) => {
        const timeZone = 'Asia/Bishkek';

        const calculateHoursDifference = (start_time: string, end_time: string) => {
          const timeZone = 'Asia/Bishkek';

          const startTime = dayjs.tz(`1970-01-01 ${start_time}`, timeZone);
          const endTime = dayjs.tz(
            `1970-01-${end_time === '' || end_time === '00:00:00Z' ? '02' : '01'} ${end_time}`,
            timeZone,
          );

          return endTime.diff(startTime, 'hour');
        };

        const formatHours = (hours: number) => {
          if (hours === 1 || hours === 21) {
            return `${hours} час`;
          } else if ((hours > 1 && hours < 5) || hours > 21) {
            return `${hours} часа`;
          } else {
            return `${hours} часов`;
          }
        };

        const hoursDifference = calculateHoursDifference(record.start_time, record.end_time);
        return (
          <>
            <div className={b('time-block')}>
              <TimePicker
                time={dayjs.tz(`1970-01-01 ${record.start_time}`, timeZone).toDate()}
                minTime={dayjs.tz(`1970-01-01 00:00:00`, timeZone).toDate()}
                maxTime={dayjs.tz(`1970-01-01 ${record.end_time}`, timeZone).toDate()}
              />{' '}
              -{' '}
              <TimePicker
                time={dayjs.tz(`1970-01-01 ${record.end_time}`, timeZone).toDate()}
                minTime={dayjs.tz(`1970-01-01 ${record.start_time}`, timeZone).toDate()}
                maxTime={dayjs.tz(`1970-01-01 23:59:59`, timeZone).toDate()}
              />
              <p className={b('hours')}>{formatHours(hoursDifference)}</p>
              <Button
                className={b('add-break')}
                type='link'
                onClick={() => addBreak(record.day, record?.id as number)}
              >
                + Добавить Перерыв
              </Button>
            </div>
          </>
        );
      },
    },
  ] as IColumn[];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={b()}>
      <div className={b('table-block')}>
        <TableComponent
          scroll={{ x: 560 }}
          pagination={false}
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          data={schedules || []}
          columns={columns}
          notGrayRow
        />
      </div>
      <Button className={b('save-schedule')} type='primary' onClick={handleOkCancel}>
        Сохранить
      </Button>
    </div>
  );
};

export default ScheduleModal;
