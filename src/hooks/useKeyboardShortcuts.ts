
import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  handleNavigate: (tab: string) => void;
  saveUserData: () => void;
  setLastSaved: (date: Date) => void;
}

export const useKeyboardShortcuts = ({ 
  handleNavigate, 
  saveUserData, 
  setLastSaved 
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            handleNavigate('account');
            break;
          case '2':
            event.preventDefault();
            handleNavigate('capture');
            break;
          case '3':
            event.preventDefault();
            handleNavigate('trophies');
            break;
          case 's':
            event.preventDefault();
            saveUserData();
            setLastSaved(new Date());
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate, saveUserData, setLastSaved]);
};
