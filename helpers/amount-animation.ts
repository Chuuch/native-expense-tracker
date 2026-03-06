import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface UseAmountAnimationProps {
  targetValue: number;
  duration?: number;
  onComplete?: () => void;
}

interface UseAmountAnimationReturn {
  displayValue: number;
  animatedValue: Animated.Value;
  restartAnimation: () => void;
  formatCurrency: (value: number) => string;
}

export const useAmountAnimation = ({
  targetValue,
  duration = 2000,
  onComplete
}: UseAmountAnimationProps): UseAmountAnimationReturn => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: targetValue,
      duration: duration,
      useNativeDriver: false,
    });
    
    animation.start(() => {
      onComplete?.();
    });
    
    const listener = animatedValue.addListener(({ value }: { value: number }) => {
      setDisplayValue(value);
    });
    
    return () => {
      animatedValue.removeListener(listener);
    };
  }, [targetValue, duration, onComplete]);

  const restartAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: targetValue,
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      onComplete?.();
    });
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return {
    displayValue,
    animatedValue,
    restartAnimation,
    formatCurrency
  };
};
