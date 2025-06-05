
interface StoredInsect {
  id: string;
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
  diet: string;
  lifeCycle: string;
  geographicRange: string;
  wingspanSize: string;
  ecologicalRole: string;
  description: string;
  timestamp: number;
  image?: string;
  isFavorite?: boolean;
}

const HISTORY_KEY = 'insect_identification_history';
const FAVORITES_KEY = 'insect_favorites';

export const saveToHistory = (insectData: Omit<StoredInsect, 'id' | 'timestamp'>) => {
  try {
    const history = getHistory();
    const newEntry: StoredInsect = {
      ...insectData,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    const updatedHistory = [newEntry, ...history.slice(0, 49)]; // Keep last 50 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return newEntry;
  } catch (error) {
    console.error('Error saving to history:', error);
    return null;
  }
};

export const getHistory = (): StoredInsect[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

export const toggleFavorite = (insectId: string) => {
  try {
    const history = getHistory();
    const updatedHistory = history.map(insect => 
      insect.id === insectId 
        ? { ...insect, isFavorite: !insect.isFavorite }
        : insect
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    
    // Also update favorites list
    const favorites = getFavorites();
    const insect = updatedHistory.find(i => i.id === insectId);
    
    if (insect?.isFavorite) {
      const updatedFavorites = [...favorites, insect];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter(f => f.id !== insectId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
    
    return insect?.isFavorite || false;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const getFavorites = (): StoredInsect[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};
