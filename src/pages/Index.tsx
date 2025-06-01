import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import IdentificationResult from '@/components/IdentificationResult';
import AppInfo from '@/components/AppInfo';
import Footer from '@/components/Footer';
import { identifyInsect } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [identificationResult, setIdentificationResult] = useState<InsectData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [identificationError, setIdentificationError] = useState<string>('');
  const apiKey = 'AIzaSyDGPeSilZ_tqvZ0qML1Ly8nSdYOITRmxtk';
  const { toast } = useToast();

  const handleImageSelect = async (image: string) => {
    console.log('Image selected, starting identification...');
    setSelectedImage(image);
    setIdentificationResult(null); // Clear previous results immediately
    setIdentificationError(''); // Clear previous errors
    
    if (!apiKey) {
      setIdentificationError('Please configure your Google Gemini API key.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await identifyInsect(image, apiKey);
      console.log('Identification result:', result);
      setIdentificationResult(result);
      toast({
        title: "Identification Complete!",
        description: `Identified as ${result.commonName}`,
      });
    } catch (error) {
      console.error('Error identifying insect:', error);
      
      // Check if it's a validation error (not an insect)
      if (error instanceof Error && error.message.includes('appears to show')) {
        setIdentificationError(error.message);
      } else {
        setIdentificationError('There was an error analyzing the image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">About Insect Identifier Pro</h2>
            <div className="text-white/90 space-y-4">
              <p>
                Our mission is to connect people with the incredible diversity of insect life through 
                cutting-edge AI technology. We believe that understanding and appreciating insects 
                is crucial for environmental conservation and scientific education.
              </p>
              <p>
                Developed by a team of entomologists, software engineers, and conservation biologists, 
                this app represents the fusion of scientific expertise and modern technology to make 
                entomology accessible to everyone.
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                <ul className="space-y-2">
                  <li>🌱 Environmental Conservation</li>
                  <li>📚 Scientific Education</li>
                  <li>🔬 Research Excellence</li>
                  <li>🌍 Global Accessibility</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="text-white/90 space-y-4">
              <p>We'd love to hear from you! Whether you have questions, feedback, or suggestions for improvement.</p>
              
              <div className="space-y-3">
                <div>
                  <strong>Email:</strong> support@insectidentifier.com
                </div>
                <div>
                  <strong>Research Inquiries:</strong> research@insectidentifier.com
                </div>
                <div>
                  <strong>Technical Support:</strong> tech@insectidentifier.com
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Follow Our Research</h3>
                <p className="text-sm">
                  Stay updated with our latest findings and app improvements by following 
                  our research publications and community updates.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'guide':
        return (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">User Guide</h2>
            <div className="text-white/90 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
                <p>Follow these simple steps to identify insects with high accuracy:</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">📸 Taking Great Photos</h4>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• Ensure good lighting (natural light works best)</li>
                  <li>• Get as close as possible while maintaining focus</li>
                  <li>• Include the entire insect in the frame</li>
                  <li>• Keep the background simple and uncluttered</li>
                  <li>• Hold the camera steady to avoid blur</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🔍 Best Results Tips</h4>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• Photograph live or recently deceased specimens</li>
                  <li>• Capture multiple angles if possible</li>
                  <li>• Include scale references (like coins) for size context</li>
                  <li>• Note the location and habitat where found</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">📊 Understanding Results</h4>
                <p className="text-sm">
                  Our AI provides confidence-based identifications along with detailed 
                  taxonomic information. Results include common and scientific names, 
                  habitat information, and ecological significance.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <ImageUpload onImageSelect={handleImageSelect} selectedImage={selectedImage} />
            
            {(identificationResult || isLoading || identificationError) && (
              <IdentificationResult 
                result={identificationResult} 
                isLoading={isLoading} 
                error={identificationError}
              />
            )}
            
            {!selectedImage && !isLoading && !identificationError && <AppInfo />}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen nature-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
