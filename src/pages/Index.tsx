
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import CatchTab from '@/components/CatchTab';
import AccountTab from '@/components/AccountTab';
import AchievementsTab from '@/components/AchievementsTab';
import LoadingPage from '@/components/LoadingPage';
import SignInPage from '@/components/SignInPage';
import DataSyncIndicator from '@/components/DataSyncIndicator';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import UserWelcomeIndicator from '@/components/layout/UserWelcomeIndicator';
import TabTransitionOverlay from '@/components/layout/TabTransitionOverlay';
import { Toaster } from '@/components/ui/toaster';
import { useDataPersistence } from '@/hooks/useDataPersistence';
import { useAuthState } from '@/hooks/useAuthState';
import { useTabNavigation } from '@/hooks/useTabNavigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import LuresTab from '@/components/LuresTab';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>();
  
  const { userData, isLoading: dataLoading, saveUserData } = useDataPersistence();
  const { isLoggedIn, userInfo, userProfile, handleSignInComplete } = useAuthState();
  const { 
    activeTab, 
    tabTransition, 
    triggerCamera, 
    handleNavigate, 
    handleCameraClose 
  } = useTabNavigation();

  // Keyboard shortcuts
  useKeyboardShortcuts({ 
    handleNavigate, 
    saveUserData, 
    setLastSaved 
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Show sign-in page if not logged in
    if (!isLoggedIn) {
      setShowSignIn(true);
    }
  };

  const handleSignIn = (loginInfo: Parameters<typeof handleSignInComplete>[0]) => {
    handleSignInComplete(loginInfo);
    setShowSignIn(false);
  };

  // Update last saved timestamp when data changes
  useEffect(() => {
    if (!dataLoading && !isLoading && isLoggedIn) {
      setLastSaved(new Date());
    }
  }, [userData, dataLoading, isLoading, isLoggedIn]);

  // Show loading screen
  if (isLoading || dataLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  // Show sign-in page if not logged in
  if (showSignIn && !isLoggedIn) {
    return <SignInPage onSignInComplete={handleSignIn} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'capture':
        return <CatchTab openCamera={triggerCamera} onCameraClose={handleCameraClose} />;
      case 'lures':
        return <LuresTab />;
      case 'account':
        return <AccountTab onNavigate={handleNavigate} />;
      case 'trophies':
        return <AchievementsTab />;
      default:
        return <CatchTab openCamera={triggerCamera} onCameraClose={handleCameraClose} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      {/* Status Indicators */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <NetworkStatusIndicator />
        <DataSyncIndicator 
          lastSaved={lastSaved}
        />
      </div>

      {/* User Welcome Indicator */}
      <UserWelcomeIndicator userInfo={userInfo} userProfile={userProfile} />

      {/* Tab Transition Overlay */}
      <TabTransitionOverlay isVisible={tabTransition} />

      {/* Main Content with transition */}
      <div className={`min-h-screen transition-opacity duration-300 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-fade-in">
          {renderActiveTab()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleNavigate} />
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
