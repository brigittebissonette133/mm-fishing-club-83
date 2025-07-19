
import React from 'react';

interface TabTransitionOverlayProps {
  isVisible: boolean;
}

const TabTransitionOverlay = ({ isVisible }: TabTransitionOverlayProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default TabTransitionOverlay;
