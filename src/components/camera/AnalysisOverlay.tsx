
import React from 'react';
import { Card } from '@/components/ui/card';

const AnalysisOverlay = () => {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
      <Card className="p-6 mx-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h3 className="text-lg font-semibold mb-2">Analyzing your catch...</h3>
          <p className="text-muted-foreground mb-2">🐟 Identifying species</p>
          <p className="text-muted-foreground mb-2">📏 Measuring size</p>
          <p className="text-muted-foreground">📍 Getting location</p>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisOverlay;
