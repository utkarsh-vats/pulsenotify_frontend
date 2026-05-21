export const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('access') : null;
export const setToken = (token: string) => localStorage.setItem('access', token);
export const removeToken = () => localStorage.removeItem('access')
export const isAuthenticated = () => !!getToken();