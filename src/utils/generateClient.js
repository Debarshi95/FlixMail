const generateClient = (baseUrl = '') => {
  const config = {};
  config.get = async (pathName) => {
    return fetch(`${baseUrl}${pathName}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  };
  return config;
};

export default generateClient;
