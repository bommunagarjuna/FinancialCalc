
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // no custom props needed yet
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`block w-full px-3 py-2 bg-background border border-muted rounded-md text-sm shadow-sm placeholder-muted-foreground 
      focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary 
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}`}
      {...props}
    />
  );
};

export default Input;
