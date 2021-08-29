const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
  return localStorage.setItem(key);
};

const clearLocalStorage = () => {
  return localStorage.clear();
};

const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  removeLocalStorage,
};
