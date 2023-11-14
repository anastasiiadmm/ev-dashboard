import { useState } from 'react';

import { useNotification } from '~/shared/hooks';

const useRowSelection = (arrayOfItems, updateStatusFunction) => {
  const openNotification = useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeactivateButton, setIsDeactivateButton] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [changeStatus, setChangeStatus] = useState({ active: false, ids: [] });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedStatuses = newSelectedRowKeys.map((key) => {
      const selectedTag = arrayOfItems.find((item) => item.id === parseInt(key.toString(), 10));
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
      openNotification('error', '', e.message);
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
