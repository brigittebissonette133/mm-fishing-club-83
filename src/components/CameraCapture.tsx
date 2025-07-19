
import React from 'react';
import { useCameraCaptureLogic } from '@/hooks/useCameraCaptureLogic';
import { useCameraCaptureHandlers } from '@/hooks/useCameraCaptureHandlers';
import { useCameraCaptureEffects } from '@/hooks/useCameraCaptureEffects';
import CameraHeader from './camera/CameraHeader';
import CameraView from './camera/CameraView';
import CapturedImage from './camera/CapturedImage';
import AnalysisOverlay from './camera/AnalysisOverlay';
import CameraControls from './camera/CameraControls';
import LureSelectionDialog from './catch/LureSelectionDialog';

interface CameraCaptureProps {
  onClose: () => void;
}

const CameraCapture = ({ onClose }: CameraCaptureProps) => {
  const {
    capturedImage,
    setCapturedImage,
    isUiReady,
    setIsUiReady,
    isSaving,
    setIsSaving,
    toast,
    stream,
    error,
    isLoading,
    cameraReady,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto,
    fishData,
    locationData,
    isAnalyzing,
    analysisError,
    analyzeFish,
    resetAnalysis,
    retryAnalysis
  } = useCameraCaptureLogic();

  const { handleCapturePhoto, handleRetake, handleSave, handleRetryAnalysis } = useCameraCaptureHandlers({
    capturePhoto,
    stopCamera,
    startCamera,
    analyzeFish,
    resetAnalysis,
    retryAnalysis,
    setCapturedImage,
    setIsSaving,
    fishData,
    locationData,
    capturedImage,
    analysisError,
    toast,
    onClose
  });

  useCameraCaptureEffects({
    setIsUiReady,
    startCamera,
    stopCamera,
    toast,
    onClose,
    stream,
    capturedImage
  });

  return (
    <>
      <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
        isUiReady ? 'opacity-100' : 'opacity-0'
      }`}>
        <CameraHeader onClose={onClose} />

        {/* Camera View / Captured Image */}
        <div className="flex-1 relative">
          {capturedImage ? (
            <div className="animate-fade-in">
              <CapturedImage
                capturedImage={capturedImage}
                fishData={fishData}
                locationData={locationData}
                isAnalyzing={isAnalyzing}
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <CameraView
                videoRef={videoRef}
                canvasRef={canvasRef}
                error={error}
                isLoading={isLoading}
                cameraReady={cameraReady}
                onRetry={startCamera}
              />
            </div>
          )}

          {/* Analysis Overlay */}
          {isAnalyzing && <AnalysisOverlay />}
        </div>

        {/* Bottom Controls */}
        <div className="animate-slide-in-from-bottom">
          <CameraControls
            capturedImage={capturedImage}
            error={error}
            cameraReady={cameraReady}
            isLoading={isLoading || isSaving}
            fishData={fishData}
            analysisError={analysisError}
            isAnalyzing={isAnalyzing}
            onCapture={handleCapturePhoto}
            onRetake={handleRetake}
            onSave={handleSave}
            onRetryAnalysis={handleRetryAnalysis}
          />
        </div>
      </div>
    </>
  );
};

export default CameraCapture;
