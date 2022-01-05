export const getFirstChar = (str) => str.charAt(0).toUpperCase();

export const toStartCase = (name) => {
  const char = getFirstChar(name);
  return char + name.slice(1);
};

export const formatDate = (timeStamp = '') => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = new Date(timeStamp).toLocaleDateString('en-IN', options);
  return date;
};

export const persistInStorage = (data, key = '') => {
  const dataKey = key.toLowerCase();
  const persistedData = JSON.parse(localStorage.getItem(dataKey)) || { list: [] };

  const itemExists = Object.values(persistedData.list).find((item) => item.id === data.id);

  if (!itemExists) {
    persistedData.list.push(data);
    localStorage.setItem(dataKey, JSON.stringify(persistedData));
  }
};

export const loadFromStorage = (key = '') => {
  return JSON.parse(localStorage.getItem(key.toLowerCase()));
};
