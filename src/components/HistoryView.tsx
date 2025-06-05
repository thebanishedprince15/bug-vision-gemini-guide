
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getHistory, getFavorites, clearHistory } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

interface HistoryViewProps {
  viewMode: 'history' | 'favorites';
}

const HistoryView: React.FC<HistoryViewProps> = ({ viewMode }) => {
  const { toast } = useToast();
  const [items, setItems] = React.useState(viewMode === 'favorites' ? getFavorites() : getHistory());

  React.useEffect(() => {
    setItems(viewMode === 'favorites' ? getFavorites() : getHistory());
  }, [viewMode]);

  const handleClearHistory = () => {
    clearHistory();
    setItems([]);
    toast({
      title: "History cleared",
      description: "All identification history has been removed.",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (items.length === 0) {
    return (
      <Card className="p-6 glass-effect">
        <h2 className="text-2xl font-bold text-white mb-4">
          {viewMode === 'favorites' ? 'Your Favorites' : 'Identification History'}
        </h2>
        <p className="text-white/80 text-center py-8">
          {viewMode === 'favorites' 
            ? 'No favorite insects yet. Start identifying insects and save your favorites!' 
            : 'No identification history yet. Start identifying insects to see them here!'}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 glass-effect">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          {viewMode === 'favorites' ? 'Your Favorites' : 'Identification History'}
        </h2>
        {viewMode === 'history' && (
          <Button
            onClick={handleClearHistory}
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600"
            size="sm"
          >
            Clear History
          </Button>
        )}
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.commonName}</h3>
                <p className="text-green-300 italic text-sm">{item.scientificName}</p>
              </div>
              {item.isFavorite && <span className="text-yellow-400">⭐</span>}
            </div>
            <p className="text-white/80 text-sm line-clamp-2 mb-2">{item.description}</p>
            <p className="text-white/60 text-xs">{formatDate(item.timestamp)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryView;
