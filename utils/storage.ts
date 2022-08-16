/**
 * Operation Storage
 */
function setStorage(type: 'localStorage' | 'sessionStorage', key: string, value: any) {
  window[type].setItem(key, JSON.stringify(value));
}

/**
 * getStorage
 */
function getStorage(type: 'localStorage' | 'sessionStorage', key: string) {
  try {
    const value = window[type].getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  } catch (e) {
    console.error('JSON.parse getStorage Error: ' + key);
    return undefined;
  }
}

/**
 * setLocalStorage
 */
export const setLocalStorage = (key: string, value: any) => setStorage('localStorage', key, value);

/**
 * getLocalStorage
 */
export const getLocalStorage = <T = any>(key: string): T => getStorage('localStorage', key);

/**
 * setSessionStorage
 */
export const setSessionStorage = (key: string, value: any) => setStorage('sessionStorage', key, value);

/**
 * getSessionStorage
 */
export const getSessionStorage = (key: string): any => getStorage('sessionStorage', key);
