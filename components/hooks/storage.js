const useStorage = () => {
  const getStorage = (
    type,
  ) => (type === "local" ? localStorage : sessionStorage);

  const isBrowser = typeof window !== "undefined";

  const getData = (key, type = "session") => {
    return isBrowser ? getStorage(type).getItem(key) || "" : "";
  };

  const setData = (key, value, type = "session") => {
    if (isBrowser) {
      getStorage(type).setItem(key, value);
      return true;
    }

    return false;
  };

  const removeData = (key, type = "session") => {
    getStorage(type).removeData(key);
  };

  return {
    getData,
    setData,
    removeData,
  };
};

export default useStorage;
