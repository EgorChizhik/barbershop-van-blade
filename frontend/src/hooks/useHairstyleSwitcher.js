import { useState, useEffect, useRef } from 'react';

const useHairstyleSwitcher = (images, autoPlay = false) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const imagePromises = images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, [images]);

  useEffect(() => {
    if (!autoPlay || !isLoaded) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, isLoaded, images.length]);

  const handleNext = () => {
    if (!isLoaded) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (!isLoaded) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleGoTo = (index) => {
    if (!isLoaded || index === currentIndex) return;
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    handleNext,
    handlePrev,
    handleGoTo,
    isLoaded
  };
};

export default useHairstyleSwitcher;