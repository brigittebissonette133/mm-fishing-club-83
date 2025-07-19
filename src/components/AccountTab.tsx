
import React from 'react';
import { User, Fish, Map, Package, Trophy, Settings, Bell, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ProfileForm from '@/components/account/ProfileForm';

interface AccountTabProps {
  onNavigate?: (tab: string) => void;
}

const AccountTab = ({ onNavigate }: AccountTabProps) => {
  const menuItems = [
    { id: 'catches', label: 'My Catches', icon: Fish, description: 'View all your caught fish', action: () => onNavigate?.('capture') },
    { id: 'map', label: 'Fishing Map', icon: Map, description: 'Explore fishing locations', action: () => onNavigate?.('capture') },
    { id: 'lures', label: 'My Lures', icon: Package, description: 'Manage your lure collection', action: () => onNavigate?.('capture') },
    { id: 'achievements', label: 'Achievements', icon: Trophy, description: 'View your fishing achievements', action: () => onNavigate?.('trophies') },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Manage your notifications', action: () => console.log('Notifications feature coming soon') },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'App settings and preferences', action: () => console.log('Settings feature coming soon') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 overflow-y-auto">
      {/* Header */}
      <section className="water-gradient py-16 px-4 text-center relative">
        <div className="z-10 space-y-4">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">Account</h1>
          <p className="text-white/90 text-lg max-w-md mx-auto">Manage your fishing profile and settings</p>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <ProfileForm />
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Account Features</h2>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={item.action}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate?.('capture')}
            >
              <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-sm">Quick Catch</p>
            </Card>
            <Card 
              className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate?.('capture')}
            >
              <Map className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-sm">Find Spots</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default AccountTab;
