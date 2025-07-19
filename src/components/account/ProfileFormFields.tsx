
import React from 'react';
import { User, Mail, Lock, AtSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface ProfileFormFieldsProps {
  formData: FormData;
  errors: Record<string, string>;
  isLoading: boolean;
  onInputChange: (field: string, value: string) => void;
}

const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  formData,
  errors,
  isLoading,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <AtSign className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) => onInputChange('username', e.target.value)}
            className={`pl-10 ${errors.username ? 'border-destructive' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        <p className="text-xs text-muted-foreground">
          Password must contain at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>
    </div>
  );
};

export default ProfileFormFields;
