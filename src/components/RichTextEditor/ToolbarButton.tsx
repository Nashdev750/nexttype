import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
  title: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon: Icon, 
  isActive = false, 
  onClick, 
  title 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-700 transition-colors ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
      }`}
      title={title}
    >
      <Icon size={18} />
    </button>
  );
};

export default ToolbarButton;