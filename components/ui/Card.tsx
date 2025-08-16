
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg border border-muted/DEFAULT shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
