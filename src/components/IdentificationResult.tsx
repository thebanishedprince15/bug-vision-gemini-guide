
import React from 'react';
import { Card } from '@/components/ui/card';

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
}

const IdentificationResult: React.FC<IdentificationResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-6 glass-effect">
        <div className="text-center">
          <div className="animate-pulse-soft text-white text-lg">
            🔍 Analyzing your insect...
          </div>
          <div className="mt-4">
            <div className="animate-spin h-8 w-8 border-4 border-white/30 border-t-white rounded-full mx-auto"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-effect card-hover">
        <h2 className="text-2xl font-bold text-white mb-2">{result.commonName}</h2>
        <p className="text-nature-yellow font-semibold text-lg mb-4 italic">{result.scientificName}</p>
        <p className="text-white/90 leading-relaxed">{result.description}</p>
      </Card>

      <Card className="p-6 glass-effect card-hover">
        <h3 className="text-xl font-bold text-white mb-4">🔬 Scientific Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="space-y-2">
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Common Name:</td>
                <td className="py-3 text-white">{result.commonName}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Scientific Name:</td>
                <td className="py-3 text-white italic">{result.scientificName}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Order:</td>
                <td className="py-3 text-white">{result.order}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Habitat:</td>
                <td className="py-3 text-white">{result.habitat}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Diet:</td>
                <td className="py-3 text-white">{result.diet}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Life Cycle:</td>
                <td className="py-3 text-white">{result.lifeCycle}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Geographic Range:</td>
                <td className="py-3 text-white">{result.geographicRange}</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="py-3 font-semibold text-nature-yellow">Wingspan/Size:</td>
                <td className="py-3 text-white">{result.wingspanSize}</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-nature-yellow">Ecological Role:</td>
                <td className="py-3 text-white">{result.ecologicalRole}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default IdentificationResult;
