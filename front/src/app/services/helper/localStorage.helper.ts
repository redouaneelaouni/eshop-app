import {User} from "../../model/auth.model";

export class StorageHelper {
  static store<T>(key: string, item: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(item));

      if (StorageHelper.isUser(item)) {
        localStorage.setItem('token', item.token);
      }

      return true;
    } catch (error) {
      console.error(`Error saving item to localStorage for key ${key}:`, error);
      return false;
    }
  }

  static get<T>(key: string): T | undefined {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        console.warn(`No item found in localStorage for key ${key}`);
        return undefined;
      }

      const parsedItem = JSON.parse(storedItem) as T;

      // Special handling for User type with token
      if (StorageHelper.isUser(parsedItem)) {
        const token = localStorage.getItem('token');
        if (token) {
          parsedItem.token = token;
        }
      }

      return parsedItem;
    } catch (error) {
      console.error(`Error retrieving item from localStorage for key ${key}:`, error);
      return undefined;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  private static isUser(item: any): item is User {
    return item && typeof item === 'object' && 'token' in item;
  }
}
