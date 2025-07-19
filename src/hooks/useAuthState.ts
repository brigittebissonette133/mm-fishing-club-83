
import { useState, useEffect } from 'react';
import { SecureStorage } from '@/utils/secureStorage';

interface LoginInfo {
  email: string;
  name: string;
  loginTime: string;
}

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profilePhoto?: string;
}

export const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<LoginInfo | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [securityWarning, setSecurityWarning] = useState<boolean>(false);

  // Check login status and session validity
  useEffect(() => {
    // Show security warning for demo
    console.warn('🚨 SECURITY WARNING: This is a demo application with simulated authentication. Do not use for real user data.');
    setSecurityWarning(true);

    const checkLoginStatus = (): void => {
      try {
        // Validate session security first
        if (!SecureStorage.validateSession()) {
          handleLogout();
          return;
        }

        const isUserLoggedIn = SecureStorage.isLoggedIn();
        
        if (isUserLoggedIn) {
          const savedLoginInfo = SecureStorage.getItem<LoginInfo>('user_login');
          const savedProfile = SecureStorage.getItem<UserProfile>('user_profile');
          
          if (savedLoginInfo) {
            setUserInfo(savedLoginInfo);
            setIsLoggedIn(true);
            SecureStorage.updateSessionTimestamp();
            
            if (savedProfile) {
              setUserProfile(savedProfile);
            }
          } else {
            // Invalid session data
            handleLogout();
          }
        } else {
          // Session expired or invalid
          setSessionExpired(true);
          handleLogout();
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        handleLogout();
      }
    };
    
    checkLoginStatus();

    // Check session every 2 minutes (more frequent for security)
    const sessionCheck = setInterval(checkLoginStatus, 2 * 60 * 1000);
    
    return () => clearInterval(sessionCheck);
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const handleStorageChange = (): void => {
      if (isLoggedIn) {
        const savedProfile = SecureStorage.getItem<UserProfile>('user_profile');
        if (savedProfile) {
          setUserProfile(savedProfile);
        }
      }
    };

    window.addEventListener('profileUpdated', handleStorageChange);
    return () => window.removeEventListener('profileUpdated', handleStorageChange);
  }, [isLoggedIn]);

  const handleSignInComplete = (loginInfo: LoginInfo): void => {
    try {
      // Validate login info
      if (!loginInfo.email || !loginInfo.name) {
        throw new Error('Invalid login information');
      }

      // Security warning
      console.warn('🚨 DEMO AUTHENTICATION: This is not real authentication. Never use this pattern in production.');

      setUserInfo(loginInfo);
      setIsLoggedIn(true);
      setSessionExpired(false);
      
      // Save to storage with session timestamp (no passwords ever stored)
      SecureStorage.setItem('user_login', loginInfo);
      SecureStorage.setItem('is_logged_in', true);
      SecureStorage.updateSessionTimestamp();
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const handleLogout = (): void => {
    try {
      SecureStorage.logout();
      setUserInfo(null);
      setUserProfile(null);
      setIsLoggedIn(false);
      setSessionExpired(false);
      
      // Dispatch logout event for other components
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      
      console.log('🔒 Demo session ended - all local data cleared');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshSession = (): void => {
    if (isLoggedIn && SecureStorage.validateSession()) {
      SecureStorage.updateSessionTimestamp();
      setSessionExpired(false);
    } else {
      handleLogout();
    }
  };

  return {
    isLoggedIn,
    userInfo,
    userProfile,
    sessionExpired,
    securityWarning,
    handleSignInComplete,
    handleLogout,
    refreshSession
  };
};
