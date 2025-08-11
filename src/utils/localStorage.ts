// localStorage utility with error handling and browser compatibility

interface StorageData {
  tasks: any[];
  darkMode: boolean;
}

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Safe localStorage getter
export const getFromStorage = (key: string, defaultValue: any = null): any => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, using default value');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Safe localStorage setter
export const setToStorage = (key: string, value: any): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, data will not be persisted');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

// Remove item from localStorage
export const removeFromStorage = (key: string): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

// Clear all localStorage
export const clearStorage = (): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Get storage usage info
export const getStorageInfo = (): { used: number; available: number; percentage: number } => {
  if (!isLocalStorageAvailable()) {
    return { used: 0, available: 0, percentage: 0 };
  }

  try {
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Most browsers have ~5-10MB limit
    const available = 5 * 1024 * 1024; // 5MB estimate
    const percentage = Math.round((used / available) * 100);
    
    return { used, available, percentage };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, available: 0, percentage: 0 };
  }
};

// Initialize default storage data
export const initializeStorage = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  // Set default values if they don't exist
  if (getFromStorage('tasks') === null) {
    setToStorage('tasks', []);
  }
  
  if (getFromStorage('darkMode') === null) {
    setToStorage('darkMode', false);
  }
};

// Export storage availability status as a function
export const storageAvailable = (): boolean => isLocalStorageAvailable(); 