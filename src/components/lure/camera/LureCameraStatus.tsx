
import React from 'react';

interface LureCameraStatusProps {
  isLoading: boolean;
  cameraReady: boolean;
}

const LureCameraStatus = ({ isLoading, cameraReady }: LureCameraStatusProps) => {
  return (
    <div className="text-center">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 ${
        isLoading 
          ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/40' 
          : !cameraReady 
            ? 'bg-red-500/20 text-red-200 border border-red-500/40'
            : 'bg-green-500/20 text-green-200 border border-green-500/40'
      }`}>
        {isLoading ? (
          <>Loading camera...</>
        ) : !cameraReady ? (
          <>Camera not ready</>
        ) : (
          <>Ready to capture</>
        )}
      </div>
    </div>
  );
};

export default LureCameraStatus;
