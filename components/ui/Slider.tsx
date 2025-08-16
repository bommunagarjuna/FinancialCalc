
import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // no custom props needed yet
}

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return (
    <input
      type="range"
      className={`w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-5
      [&::-webkit-slider-thumb]:h-5
      [&::-webkit-slider-thumb]:bg-primary
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:shadow-sm
      [&::-webkit-slider-thumb]:transition-transform
      [&::-webkit-slider-thumb]:hover:scale-110
      
      [&::-moz-range-thumb]:w-5
      [&::-moz-range-thumb]:h-5
      [&::-moz-range-thumb]:bg-primary
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:border-none
      [&::-moz-range-thumb]:shadow-sm
      [&::-moz-range-thumb]:transition-transform
      [&::-moz-range-thumb]:hover:scale-110

      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
      ${className}`}
      {...props}
    />
  );
};

export default Slider;
