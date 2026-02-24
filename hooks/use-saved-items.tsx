'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface SavedItem {
  id: number;
  slug: string;
  name: string;
  price: string;
  img: string;
  category?: string;
  quantity: number;
  addedAt: number;
}

interface SavedItemsContextType {
  savedItems: SavedItem[];
  addItem: (item: Omit<SavedItem, 'quantity' | 'addedAt'>, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearItems: () => void;
  isItemSaved: (id: number) => boolean;
  toggleItem: (item: Omit<SavedItem, 'quantity' | 'addedAt'>) => void;
  getTotalItems: () => number;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

const STORAGE_KEY = 'anastasya-saved-items';

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedItems(parsed);
      }
    } catch (error) {
      console.error('Error loading saved items:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
      } catch (error) {
        console.error('Error saving items:', error);
      }
    }
  }, [savedItems, isHydrated]);

  const addItem = useCallback((item: Omit<SavedItem, 'quantity' | 'addedAt'>, quantity: number = 1) => {
    setSavedItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        // Update quantity if already exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      // Add new item
      return [...prev, { ...item, quantity, addedAt: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setSavedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearItems = useCallback(() => {
    setSavedItems([]);
  }, []);

  const isItemSaved = useCallback((id: number) => {
    return savedItems.some((item) => item.id === id);
  }, [savedItems]);

  const toggleItem = useCallback((item: Omit<SavedItem, 'quantity' | 'addedAt'>) => {
    if (isItemSaved(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  }, [isItemSaved, removeItem, addItem]);

  const getTotalItems = useCallback(() => {
    return savedItems.reduce((total, item) => total + item.quantity, 0);
  }, [savedItems]);

  const contextValue: SavedItemsContextType = {
    savedItems,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    isItemSaved,
    toggleItem,
    getTotalItems,
  };

  return (
    <SavedItemsContext.Provider value={contextValue}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
