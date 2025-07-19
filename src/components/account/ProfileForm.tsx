
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProfileForm } from '@/hooks/useProfileForm';
import ProfilePhotoSection from './ProfilePhotoSection';
import ProfileFormFields from './ProfileFormFields';

const ProfileForm = () => {
  const {
    formData,
    errors,
    isLoading,
    isProfileSaved,
    handleInputChange,
    handlePhotoUpload,
    removePhoto,
    handleSave
  } = useProfileForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfilePhotoSection
          profilePhoto={formData.profilePhoto}
          name={formData.name}
          isLoading={isLoading}
          onPhotoUpload={handlePhotoUpload}
          onRemovePhoto={removePhoto}
        />

        {!isProfileSaved && (
          <>
            <ProfileFormFields
              formData={formData}
              errors={errors}
              isLoading={isLoading}
              onInputChange={handleInputChange}
            />

            <Button onClick={handleSave} className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </>
        )}

        {isProfileSaved && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Profile saved successfully!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
