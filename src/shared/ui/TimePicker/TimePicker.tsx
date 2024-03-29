import bem from 'easy-bem';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

import './TimePicker.scss';

interface Props {
  time?: Date;
  minTime?: Date;
  maxTime?: Date;
  icon?: boolean;
  id?: string;
}

const TimePicker: React.FC<Props> = ({ time, minTime, maxTime, icon = false, id }) => {
  const b = bem('TimePicker input');
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(time || null);

  return (
    <DatePicker
      id={id}
      className={!icon ? b('TimePicker input') : 'icon'}
      selected={startDate}
      onChange={(date) => setStartDate(date || null)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption={t('merchants.time')}
      dateFormat='HH:mm'
      timeFormat='HH:mm'
      minTime={minTime}
      maxTime={maxTime}
    />
  );
};

export default TimePicker;
