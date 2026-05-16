import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[]; // Array of tool IDs: "category:toolId"
  toggleFavorite: (categoryId: string, toolId: string) => void;
  isFavorite: (categoryId: string, toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('toolstudio_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (categoryId: string, toolId: string) => {
    const id = `${categoryId}:${toolId}`;
    setFavorites((prev) => {
      const next = prev.includes(id) 
        ? prev.filter((fav) => fav !== id) 
        : [...prev, id];
      localStorage.setItem('toolstudio_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (categoryId: string, toolId: string) => {
    return favorites.includes(`${categoryId}:${toolId}`);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
