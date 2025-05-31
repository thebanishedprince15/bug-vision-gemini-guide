
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelect: (image: File | string) => void;
  selectedImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      setIsLoading(true);
      
      // Check if it's actually an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        setIsLoading(false);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('File read successfully, calling onImageSelect');
        onImageSelect(result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        alert('Error reading the file. Please try again.');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleCameraCapture = async () => {
    try {
      setIsLoading(true);
      
      // Check if we're on a device that supports camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Use back camera if available
        });
        
        // Stop the stream immediately as we just wanted to check permission
        stream.getTracks().forEach(track => track.stop());
        
        // Now trigger file input with camera capture
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = handleFileUpload;
        input.click();
      } else {
        // Fallback to regular file input if camera is not available
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleFileUpload;
        input.click();
      }
    } catch (error) {
      console.error('Camera permission denied or not available:', error);
      // If camera permission is denied, fall back to file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = handleFileUpload;
      input.click();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 glass-effect card-hover">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Identify Your Insect</h2>
        <p className="text-white/80 mb-6">
          Capture or upload a photo of an insect to discover its identity and learn fascinating details!
        </p>
        
        {selectedImage ? (
          <div className="mb-6">
            <img
              src={selectedImage}
              alt="Selected insect"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 mb-6 bg-white/5">
            <Camera size={48} className="mx-auto text-white/60 mb-4" />
            <p className="text-white/60">No image selected</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleCameraCapture}
            className="bg-nature-green hover:bg-nature-green-dark text-white border-0"
            disabled={isLoading}
          >
            <Camera className="mr-2" size={20} />
            Take Photo
          </Button>
          
          <label className="cursor-pointer">
            <Button
              asChild
              className="bg-nature-yellow hover:bg-nature-yellow-dark text-nature-forest border-0"
              disabled={isLoading}
            >
              <span>
                📁 Upload Image
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
        
        {isLoading && (
          <div className="mt-4">
            <div className="animate-pulse-soft text-white">Processing image...</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;
