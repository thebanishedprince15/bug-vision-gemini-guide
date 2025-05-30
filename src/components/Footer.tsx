
import React from 'react';
import { Card } from '@/components/ui/card';

const Footer: React.FC = () => {
  return (
    <Card className="p-6 glass-effect mt-8">
      <div className="text-center text-white/80">
        <h3 className="font-bold text-lg mb-2">🦋 Insect Identifier Pro</h3>
        <p className="text-sm mb-3">
          Powered by AI • Built for Nature Enthusiasts • Scientific Precision
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>AI-Powered Identification</span>
          <span>•</span>
          <span>Educational & Research Tool</span>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs text-white/60">
            Connecting people with the incredible diversity of insect life. 
            Supporting conservation through education and awareness.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
