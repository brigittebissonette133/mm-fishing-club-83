
import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Logger } from '@/utils/logger';

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Cleanup function to stop camera stream
  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        Logger.debug('Camera track stopped', { kind: track.kind });
      });
      setStream(null);
      setCameraReady(false);
    }
  }, [stream]);

  // Initialize camera with optimized settings for speed
  const startCamera = useCallback(async () => {
    console.log('Starting camera...');
    try {
      setIsLoading(true);
      setError(null);
      setCameraReady(false);
      
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Simple constraints for better compatibility
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      console.log('Requesting camera access with constraints:', constraints);
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera access granted, stream received');
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log('Video element set with stream');
        
        // Wait for video to be ready
        const handleCanPlay = () => {
          console.log('Video can play, camera ready');
          setCameraReady(true);
          setIsLoading(false);
        };

        videoRef.current.oncanplay = handleCanPlay;
        
        // Fallback timeout
        setTimeout(() => {
          if (!cameraReady) {
            console.log('Fallback: Setting camera ready after timeout');
            setCameraReady(true);
            setIsLoading(false);
          }
        }, 2000);
      }
      
    } catch (err: any) {
      console.error('Camera initialization failed:', err);
      Logger.error('Camera initialization failed', { error: err.message, name: err.name });
      
      let errorMessage = 'Unable to access camera';
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access and refresh the page.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application.';
      }
      
      setError(errorMessage);
      setIsLoading(false);
      setCameraReady(false);
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [toast, cameraReady]);

  // Photo capture function
  const capturePhoto = useCallback(() => {
    console.log('Attempting to capture photo...');
    if (!videoRef.current || !canvasRef.current || !cameraReady) {
      console.warn('Photo capture attempted but camera not ready', {
        video: !!videoRef.current,
        canvas: !!canvasRef.current,
        ready: cameraReady
      });
      return null;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context || video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Canvas context not available or video not ready');
        throw new Error('Camera not ready for capture');
      }

      // Set canvas to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      console.log('Drawing video to canvas', { width: canvas.width, height: canvas.height });
      
      // Draw and capture
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      
      console.log('Photo captured successfully', { 
        size: Math.round((imageDataUrl.length * 3) / 4 / 1024) + 'KB' 
      });
      
      return imageDataUrl;
      
    } catch (err: any) {
      console.error('Photo capture failed:', err);
      Logger.error('Photo capture failed', { error: err.message });
      toast({
        title: "Capture Failed",
        description: "Failed to capture photo. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }, [cameraReady, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return {
    stream,
    error,
    isLoading,
    cameraReady,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto
  };
};
