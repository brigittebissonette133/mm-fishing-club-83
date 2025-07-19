
import { useState } from 'react';

export const useTabNavigation = () => {
  const [activeTab, setActiveTab] = useState('capture');
  const [tabTransition, setTabTransition] = useState(false);
  const [triggerCamera, setTriggerCamera] = useState(false);

  const handleNavigate = (tab: string) => {
    if (tab !== activeTab) {
      // Special handling for capture tab to trigger camera
      if (tab === 'capture') {
        setTriggerCamera(true);
        if (activeTab !== 'capture') {
          setTabTransition(true);
          setTimeout(() => {
            setActiveTab(tab);
            setTabTransition(false);
          }, 150);
        }
      } else {
        setTabTransition(true);
        setTimeout(() => {
          setActiveTab(tab);
          setTabTransition(false);
        }, 150);
      }
    } else if (tab === 'capture') {
      // If already on capture tab, still trigger camera
      setTriggerCamera(true);
    }
  };

  const handleCameraClose = () => {
    setTriggerCamera(false);
  };

  return {
    activeTab,
    tabTransition,
    triggerCamera,
    handleNavigate,
    handleCameraClose
  };
};
