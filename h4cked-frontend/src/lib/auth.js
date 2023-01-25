const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
};

const getPayLoad = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length < 3) {
    return false;
  }
  return JSON.parse(Buffer.from(parts[1], 'base64'));
};

// const isOwner = (objectId) => objectId === getPayLoad().userId;
// console.log(getPayLoad());
const isOwner = (objectId) => {
  console.log('hello', getPayLoad());
  return objectId === getPayLoad().sub;
};
export const AUTH = {
  setToken,
  getToken,
  getPayLoad,
  logout,
  isOwner,
};
