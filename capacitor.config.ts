
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2669a58ae0d74c69858c842995ab0fe4',
  appName: 'Insect Identifier Pro',
  webDir: 'dist',
  server: {
    url: 'https://2669a58a-e0d7-4c69-858c-842995ab0fe4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
