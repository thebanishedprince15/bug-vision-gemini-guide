
import React from 'react';
import { Share, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  insectName: string;
  scientificName: string;
  description: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ insectName, scientificName, description }) => {
  const { toast } = useToast();
  
  const shareText = `Just identified a ${insectName} (${scientificName}) using Insect Identifier Pro! ${description.substring(0, 100)}...`;
  const shareUrl = window.location.href;

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Identified: ${insectName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast({
          title: "Copied to clipboard!",
          description: "Share text has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Share not supported",
          description: "Your browser doesn't support sharing.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center mt-4">
      <Button
        onClick={shareNative}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
      >
        <Share className="mr-2" size={16} />
        Share
      </Button>
      
      <Button
        onClick={shareToTwitter}
        className="bg-blue-500 hover:bg-blue-600 text-white"
        size="sm"
      >
        <Twitter className="mr-2" size={16} />
        Twitter
      </Button>
      
      <Button
        onClick={shareToFacebook}
        className="bg-blue-700 hover:bg-blue-800 text-white"
        size="sm"
      >
        <Facebook className="mr-2" size={16} />
        Facebook
      </Button>
    </div>
  );
};

export default ShareButtons;
