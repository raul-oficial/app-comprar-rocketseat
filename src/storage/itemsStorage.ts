import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("Failed to retrieve items from storage");
  }
}
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  try {
    const items = await get();
    return items.filter((item) => item.status === status);
  } catch (error) {
    throw new Error("Failed to retrieve items by status from storage");
  }
}
async function save(items: ItemStorage[]) {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("Failed to save item to storage");
  }
}
async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  try {
    const items = await get();
    const updatedItems = [...items, newItem];
    await save(updatedItems);
    return updatedItems;
  } catch (error) {
    throw new Error("Failed to add item to storage");
  }
}
async function remove(id: string) {
  try {
    const items = await get();
    const updatedItems = items.filter((item) => item.id !== id);
    await save(updatedItems);
  } catch (error) {
    throw new Error("Failed to remove item from storage");
  }
}
async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("Failed to clear items from storage");
  }
}
async function toggleStatus(id: string): Promise<void> {
  const items = await get();
  const updatedItems = items.map((item) => 
    item.id === id
    ? {
        ...item,
        status:
          item.status === FilterStatus.PENDING
            ? FilterStatus.DONE
            : FilterStatus.PENDING,
    }
    :
    item
  );
  await save(updatedItems);
}
export const itemsStorage = {
  get,
  getByStatus,
  add,
  clear,
  remove,
  toggleStatus,
};
