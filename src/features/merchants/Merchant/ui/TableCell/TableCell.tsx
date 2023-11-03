import { Button } from 'antd';
import bem from 'easy-bem';
import React, { useState } from 'react';

import './TableCell.scss';

type Props = {
  data: string[];
};

const TableCell: React.FC<Props> = ({ data }) => {
  const b = bem('TableCell');
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? data : data.slice(0, 1);

  return (
    <div className={b()}>
      <div className={b('content')}>
        {displayItems.map((item, index) => (
          <p key={index} className={b('text tag-text')}>
            {item}
          </p>
        ))}
        {data.length > 1 && (
          <Button
            className={b('show-more-button')}
            type='link'
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? '<' : `+ ${data.length}`}
          </Button>
        )}
      </div>
    </div>
  );
};
export default TableCell;
