
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import ShareButtons from './ShareButtons';
import FavoriteButton from './FavoriteButton';
import { saveToHistory, toggleFavorite } from '@/utils/localStorage';

interface InsectData {
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
}

interface IdentificationResultProps {
  result: InsectData | null;
  isLoading: boolean;
  error?: string;
  selectedImage?: string;
}

const IdentificationResult: React.FC<IdentificationResultProps> = ({ result, isLoading, error, selectedImage }) => {
  const [savedInsectId, setSavedInsectId] = React.useState<string | null>(null);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    if (result && selectedImage) {
      const savedInsect = saveToHistory({
        ...result,
        image: selectedImage
      });
      if (savedInsect) {
        setSavedInsectId(savedInsect.id);
        setIsFavorite(savedInsect.isFavorite || false);
      }
    }
  }, [result, selectedImage]);

  const handleFavoriteToggle = (newFavoriteState: boolean) => {
    if (savedInsectId) {
      toggleFavorite(savedInsectId);
      setIsFavorite(newFavoriteState);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 glass-effect">
        <div className="text-center">
          <div className="animate-pulse text-white text-lg mb-4">
            🔍 Analyzing your insect...
          </div>
          <div className="mb-4">
            <div className="animate-spin h-8 w-8 border-4 border-white/30 border-t-white rounded-full mx-auto"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 glass-effect card-hover">
        <h2 className="text-2xl font-bold text-white mb-2">Not an Insect</h2>
        <p className="text-red-400 font-semibold text-lg mb-4">This image is unidentifiable</p>
        <p className="text-white/90 leading-relaxed">{error}</p>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 glass-effect card-hover">
        <h2 className="text-2xl font-bold text-white mb-2">{result.commonName}</h2>
        <p className="text-green-700 font-semibold text-lg mb-4 italic">{result.scientificName}</p>
        <p className="text-white/90 leading-relaxed mb-4">{result.description}</p>
        
        <div className="flex gap-3 justify-center">
          <FavoriteButton 
            insectId={savedInsectId || undefined}
            onToggle={handleFavoriteToggle}
            isFavorite={isFavorite}
          />
        </div>
        
        <ShareButtons
          insectName={result.commonName}
          scientificName={result.scientificName}
          description={result.description}
        />
      </Card>

      <Card className="p-6 glass-effect card-hover">
        <h3 className="text-xl font-bold text-white mb-4">🔬 Scientific Details</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableBody>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Common Name:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.commonName}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Scientific Name:
                </TableCell>
                <TableCell className="py-3 text-white italic bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.scientificName}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Order:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.order}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Habitat:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.habitat}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Diet:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.diet}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Life Cycle:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.lifeCycle}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Geographic Range:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.geographicRange}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Wingspan/Size:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.wingspanSize}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-3 font-bold text-gray-900 bg-white/95 rounded-l border-0 text-sm">
                  Ecological Role:
                </TableCell>
                <TableCell className="py-3 text-white bg-gray-900/80 rounded-r border-0 text-sm">
                  {result.ecologicalRole}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default IdentificationResult;
