
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  insectId?: string;
  onToggle?: (isFavorite: boolean) => void;
  isFavorite?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ insectId, onToggle, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { toast } = useToast();

  const handleToggle = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    
    if (onToggle) {
      onToggle(newFavoriteState);
    }
    
    toast({
      title: newFavoriteState ? "Added to favorites!" : "Removed from favorites",
      description: newFavoriteState ? "This insect has been saved to your favorites." : "This insect has been removed from your favorites.",
    });
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      className={`${favorite ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-white border-gray-300'} hover:bg-yellow-50`}
      size="sm"
    >
      {favorite ? '⭐ Favorited' : '☆ Add to Favorites'}
    </Button>
  );
};

export default FavoriteButton;
