import { appmintConfig } from './appmint-config';
import { localStorageUtils } from './utils/localstorage';

export namespace activeSession {
  let token: string;
  let user: any;
  let refreshToken: string;

  const setCookie = (name: string, value: any, days = 7) => {
    if (typeof document === 'undefined') return;
    if (!value) return;
    // Only stringify if it's not already a string
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = `${name}=${encodeURIComponent(valueToStore)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
  };

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return '';
    return document?.cookie?.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  };

  const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  export const setActiveSession = (_token: string, _user: any, _refreshToken: string) => {
    token = _token;
    user = _user;
    refreshToken = _refreshToken;

    // Save to cookies
    setCookie('token', _token);
    setCookie('user', _user); // setCookie will stringify it
    setCookie('refreshToken', _refreshToken);
    setCookie('isAuthenticated', 'true');
    
    // Dispatch event to notify components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('sessionChanged'));
    }
  };

  export const clearSession = () => {
    token = '';
    user = null;
    refreshToken = '';

    // Clear cookies
    clearCookie('token');
    clearCookie('user');
    clearCookie('refreshToken');
    clearCookie('isAuthenticated');
    
    // Dispatch event to notify components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('sessionChanged'));
    }
  };

  export const getUser = () => {
    if (!user) {
      const userCookie = getCookie('user');
      try {
        user = JSON.parse(userCookie);
      } catch (e) {
        clearCookie('user');
      }
    }
    return user;
  };

  export const getToken = (): string => {
    if (!token) {
      token = getCookie('token');
    }
    return token ? 'Bearer ' + token : '';
  };

  export const getRefreshToken = (): string => {
    if (!refreshToken) {
      refreshToken = getCookie('refreshToken');
    }
    return 'Bearer ' + refreshToken;
  };

  export const getOrgId = () => {
    if (appmintConfig.orgId) {
      return appmintConfig.orgId;
    }
    const session = localStorageUtils.get('session');
    if (session && session.orgId) {
      appmintConfig.orgId = session.orgId;
    }
    return appmintConfig.orgId;
  };
}
