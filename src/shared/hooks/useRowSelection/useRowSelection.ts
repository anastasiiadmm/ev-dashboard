import React, { useState } from 'react';

import { useNotification } from '~/shared/hooks';
import { ITag } from '~/features/tags/interfaces';
import { IMerchant } from '~/features/merchants/interfaces';
import { IChangeStatuses } from '~/shared/interfaces';

interface FetchFunctionType {
  (data: IChangeStatuses): Promise<void>;
}

const useRowSelection = (
  arrayOfItems: ITag[] | IMerchant[] | null,
  updateStatusFunction: FetchFunctionType,
) => {
  const openNotification = useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeactivateButton, setIsDeactivateButton] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [changeStatus, setChangeStatus] = useState<IChangeStatuses>({ active: false, ids: [] });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedStatuses = newSelectedRowKeys.map((key) => {
      const selectedTag = arrayOfItems?.find((item) => item.id === parseInt(key.toString(), 10));
      return selectedTag ? selectedTag.active : false;
    });

    const hasActiveTrue = selectedStatuses.includes(true);
    const hasActiveFalse = selectedStatuses.includes(false);
    const hasMixedStatus = hasActiveTrue && hasActiveFalse;

    setIsDeactivateButton(hasActiveTrue && !hasActiveFalse);
    setIsDisabledButton(hasMixedStatus);
    setChangeStatus((prevStatuses) => ({
      ...prevStatuses,
      active: !selectedStatuses[0],
      ids: newSelectedRowKeys.map(Number),
    }));
  };

  const applyChangeStatus = async () => {
    try {
      await updateStatusFunction(changeStatus);
      setSelectedRowKeys([]);
    } catch (e) {
      if (e instanceof Error) {
        openNotification('error', '', e.message);
      } else {
        console.error('An unknown error occurred:', e);
      }
    }
  };

  return {
    selectedRowKeys,
    onSelectChange,
    isDeactivateButton,
    isDisabledButton,
    applyChangeStatus,
  };
};

export default useRowSelection;
