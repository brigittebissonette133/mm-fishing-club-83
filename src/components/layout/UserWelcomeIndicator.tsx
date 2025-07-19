
import React from 'react';

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

interface UserWelcomeIndicatorProps {
  userInfo: LoginInfo | null;
  userProfile: UserProfile | null;
}

const UserWelcomeIndicator = ({ userInfo, userProfile }: UserWelcomeIndicatorProps) => {
  // Get display name priority: profile name > login name
  const getDisplayName = () => {
    if (userProfile?.name) {
      return userProfile.name;
    }
    return userInfo?.name || 'User';
  };

  if (!userInfo && !userProfile) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-primary/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-primary">
        Welcome, {getDisplayName()}!
      </div>
    </div>
  );
};

export default UserWelcomeIndicator;
