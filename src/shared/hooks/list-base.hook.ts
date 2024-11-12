import { useEffect, useState } from 'react';


export function useListBase() {
  const [searchText, setSearchText] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<Record<number, number>>({});
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [dataLength, setDataLength] = useState<number>();

  const exportData = () => {
    console.log('exportData');
  };

  const toggleCheck = (id: number, checked: boolean, length: number) => {
    setDataLength(length);
    if (checked) {
      const prv = selectedRecord;
      prv[id] = id;
      setSelectedRecord({ ...prv });
    } else {
      const prv = selectedRecord;
      delete prv[id];
      setSelectedRecord({ ...prv });
    }
  };

  const toggleCheckAll = (checked: boolean, dataList: any[]) => {
    setDataLength(dataList.length);
    if (checked) {
      const c = selectedRecord;
      dataList.forEach(({ id }: any) => {
        c[id] = id;
      });
      setSelectedRecord({ ...c });
    } else {
      setSelectedRecord({});
    }
  };

  useEffect(() => {
    setIsSelectAll(Object.keys(selectedRecord).length === dataLength);
  }, [selectedRecord]);

  return {
    isSelectAll,
    searchText,
    setSearchText,
    exportData,
    toggleCheck,
    toggleCheckAll,
    selectedRecord
  };
}