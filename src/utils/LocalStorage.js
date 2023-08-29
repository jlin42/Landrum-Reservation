const REMEMBER_ME_KEY = 'rememberMe';

export const setRememberMe = (email, password) => {
  const data = { email, password };
  localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(data));
};

export const getRememberMe = () => {
  const data = localStorage.getItem(REMEMBER_ME_KEY);
  if (data) {
    const { email, password } = JSON.parse(data);
    return { email, password };
  }
  return { email: '', password: '', rememberMe: false };
};