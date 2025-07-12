import { useState, useEffect } from 'react';

interface CanvasDimensions {
  width: number;
  height: number;
  pixelRatio: number;
  isMobile: boolean;
  isTablet: boolean;
}

export const useResponsiveCanvas = (): CanvasDimensions => {
  const [dimensions, setDimensions] = useState<CanvasDimensions>({
    width: 1024,
    height: 600,
    pixelRatio: 1,
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      
      // Device detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      setDimensions({
        width,
        height,
        pixelRatio,
        isMobile,
        isTablet,
      });
    };

    // Initial call
    updateDimensions();

    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};

// Hook for canvas-specific responsive behavior
export const useCanvasConfig = () => {
  const dimensions = useResponsiveCanvas();
  
  return {
    ...dimensions,
    // Performance settings based on device
    shadows: !dimensions.isMobile,
    antialias: !dimensions.isMobile,
    powerPreference: dimensions.isMobile ? 'low-power' : 'high-performance',
    // Camera settings
    fov: dimensions.isMobile ? 60 : 45,
    near: 0.1,
    far: 1000,
  };
};
