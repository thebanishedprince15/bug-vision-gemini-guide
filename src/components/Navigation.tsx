
import React from 'react';
import { Home, Info, Contact, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: Contact },
    { id: 'guide', label: 'User Guide', icon: BookOpen },
  ];

  return (
    <nav className="glass-effect rounded-lg p-2 mb-6">
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? 'bg-white/30 text-nature-forest'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
