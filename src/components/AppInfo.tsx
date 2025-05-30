
import React from 'react';
import { Card } from '@/components/ui/card';

const AppInfo: React.FC = () => {
  const features = [
    {
      icon: '📸',
      title: 'Instant Photo Analysis',
      description: 'Capture or upload insect photos for immediate AI-powered identification using advanced computer vision.'
    },
    {
      icon: '🧬',
      title: 'Scientific Accuracy',
      description: 'Get detailed taxonomic information including scientific names, classification, and biological data.'
    },
    {
      icon: '🌍',
      title: 'Comprehensive Database',
      description: 'Access information about insects from around the world with habitat and geographic distribution data.'
    },
    {
      icon: '📚',
      title: 'Educational Content',
      description: 'Learn about insect behavior, ecological roles, life cycles, and their importance in ecosystems.'
    },
    {
      icon: '🔬',
      title: 'Professional Grade',
      description: 'Powered by Google Gemini AI for research-quality identification and detailed biological insights.'
    },
    {
      icon: '🌱',
      title: 'Conservation Awareness',
      description: 'Understand the ecological importance of insects and their role in biodiversity and environmental health.'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-effect">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">🦋 Discover the Insect World</h2>
        <p className="text-white/90 text-center leading-relaxed">
          Welcome to the ultimate insect identification companion! Our AI-powered app helps you explore 
          the fascinating world of entomology with scientific precision and educational depth. 
          Whether you're a student, researcher, nature enthusiast, or curious explorer, 
          unlock the secrets of the six-legged universe around you.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 glass-effect card-hover">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 glass-effect">
        <h3 className="text-lg font-bold text-white mb-3">🎯 How It Works</h3>
        <ol className="text-white/90 space-y-2">
          <li className="flex items-start">
            <span className="bg-nature-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
            <span>Take a clear photo of the insect or upload an existing image</span>
          </li>
          <li className="flex items-start">
            <span className="bg-nature-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
            <span>Our AI analyzes the image using advanced machine learning algorithms</span>
          </li>
          <li className="flex items-start">
            <span className="bg-nature-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
            <span>Receive detailed identification with scientific classification and ecological information</span>
          </li>
          <li className="flex items-start">
            <span className="bg-nature-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
            <span>Explore comprehensive data including habitat, diet, and conservation status</span>
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default AppInfo;
