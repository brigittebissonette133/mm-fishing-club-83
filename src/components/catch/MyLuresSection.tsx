
import React from 'react';
import { Package, Plus, Fish } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useDataPersistence } from '@/hooks/useDataPersistence';

const MyLuresSection = () => {
  const { userData } = useDataPersistence();
  
  const getTotalCatches = (catches: any[]) => {
    return catches ? catches.reduce((sum, c) => sum + c.count, 0) : 0;
  };

  const getTopLures = () => {
    return userData.lures
      .filter(lure => lure.catches && lure.catches.length > 0)
      .sort((a, b) => getTotalCatches(b.catches || []) - getTotalCatches(a.catches || []))
      .slice(0, 4);
  };

  const topLures = getTopLures();

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">My Lures</h2>
          </div>
          <button className="text-primary hover:text-primary/80 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {topLures.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {topLures.map((lure) => (
              <Card key={lure.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">{lure.name}</h3>
                    <p className="text-xs text-muted-foreground">{lure.type}</p>
                    <p className="text-xs text-muted-foreground">{lure.color}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Fish className="w-3 h-3" />
                      <span>{getTotalCatches(lure.catches || [])} catches</span>
                    </div>
                    <span>{(lure.catches || []).length} species</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {userData.lures.slice(0, 4).map((lure) => (
              <Card key={lure.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">{lure.name}</h3>
                    <p className="text-xs text-muted-foreground">{lure.type}</p>
                    <p className="text-xs text-muted-foreground">{lure.color}</p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Used {lure.timesUsed || 0} times</span>
                    <span>{getTotalCatches(lure.catches || [])} catches</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyLuresSection;
