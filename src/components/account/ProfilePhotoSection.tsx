
import React from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfilePhotoSectionProps {
  profilePhoto: string | null;
  name: string;
  isLoading: boolean;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  profilePhoto,
  name,
  isLoading,
  onPhotoUpload,
  onRemovePhoto
}) => {
  const getInitials = () => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          {profilePhoto ? (
            <AvatarImage src={profilePhoto} alt="Profile" />
          ) : (
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {getInitials()}
            </AvatarFallback>
          )}
        </Avatar>
        <label
          htmlFor="photo-upload"
          className={`absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Camera className="w-4 h-4" />
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onPhotoUpload}
          disabled={isLoading}
          className="hidden"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => document.getElementById('photo-upload')?.click()}
          disabled={isLoading}
        >
          Change Photo
        </Button>
        {profilePhoto && (
          <Button variant="outline" size="sm" onClick={onRemovePhoto} disabled={isLoading}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSection;
