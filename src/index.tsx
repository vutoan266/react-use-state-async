import { useState, useEffect, useCallback } from "react";

type DataType = {
  isLoading: boolean;
  data: any;
  error: any;
};

export interface UseStateAsyncType extends DataType {
  setData: Function;
  fetch: Function;
}

const useStateAsync = (
  callback: Function,
  dependencies: Array<any>
): UseStateAsyncType => {
  const [data, setData] = useState<DataType>({
    isLoading: false,
    data: null,
    error: null,
  });

  const handleFetch = useCallback(async () => {
    setData((prevData) => ({ ...prevData, isLoading: true }));
    try {
      const res = await callback();
      setData({ isLoading: false, data: res, error: null });
    } catch (e) {
      setData({ isLoading: false, data: null, error: e });
    }
  }, [callback, setData]);

  useEffect(() => {
    handleFetch();
  }, dependencies);

  const handleSetData = useCallback(
    (newData) => {
      setData((prevData) => ({ ...prevData, data: newData }));
    },
    [setData]
  );

  return {
    isLoading: data.isLoading,
    data: data.data,
    error: data.error,
    setData: handleSetData,
    fetch: handleFetch,
  };
};

export default useStateAsync;
