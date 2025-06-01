
import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async (facing: 'user' | 'environment') => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(newStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current frame
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Stop the camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    onCapture(imageData);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  if (error) {
    return (
      <Card className="p-6 glass-effect">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 glass-effect">
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Camera</h3>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="relative mb-4 rounded-lg overflow-hidden bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="text-white">Starting camera...</div>
            </div>
          )}
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
          />
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            onClick={switchCamera}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <RotateCcw size={16} className="mr-2" />
            Flip
          </Button>
          
          <Button
            onClick={capturePhoto}
            disabled={isLoading}
            className="bg-nature-green hover:bg-nature-green-dark text-white"
          >
            <Camera size={16} className="mr-2" />
            Capture
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CameraCapture;
