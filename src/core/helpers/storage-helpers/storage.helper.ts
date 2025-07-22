import {isFalsy} from '../utils';
import STORAGEKEYS from './constants';

export default class StorageHelper {
  /**
   * @param key key string required for removing the corresponding item from the storage
   */
  static remove(key: STORAGEKEYS) {
    sessionStorage.removeItem(key);
  }

  /**
   * Clears the storage
   */
  static clear() {
    sessionStorage.clear();
  }

  /**
   * @param key required
   * @param value required
   */
  static setItem<T extends string>(
    key: STORAGEKEYS,
    value: T extends '' ? never : T
  ) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * @param key key string needed for getting the storage item
   * @returns if no value exists for given key then returns empty string else returns value
   */
  static getItem(key: STORAGEKEYS) {
    const value = sessionStorage.getItem(key);
    if (isFalsy(value)) {
      return '';
    }
    return JSON.parse(value || '');
  }
}
