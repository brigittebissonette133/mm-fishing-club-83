
import React, { useState, useEffect } from 'react';
import CameraCapture from './CameraCapture';
import HeroSection from './catch/HeroSection';
import FishingSpotsSection from './catch/FishingSpotsSection';
import MyLuresSection from './catch/MyLuresSection';
import RecentAchievementsSection from './catch/RecentAchievementsSection';
import FishingConditionsSection from './catch/FishingConditionsSection';

interface CatchTabProps {
  openCamera?: boolean;
  onCameraClose?: () => void;
}

const CatchTab = ({ openCamera = false, onCameraClose }: CatchTabProps) => {
  const [showCamera, setShowCamera] = useState(openCamera);

  // Handle external camera trigger
  useEffect(() => {
    if (openCamera) {
      setShowCamera(true);
    }
  }, [openCamera]);

  const handleCameraClose = () => {
    setShowCamera(false);
    if (onCameraClose) {
      onCameraClose();
    }
  };

  const handleCameraOpen = () => {
    setShowCamera(true);
  };

  if (showCamera) {
    return <CameraCapture onClose={handleCameraClose} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 overflow-y-auto">
      <HeroSection onCameraOpen={handleCameraOpen} />
      <FishingSpotsSection />
      <MyLuresSection />
      <RecentAchievementsSection />
      <FishingConditionsSection />
      
      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default CatchTab;
