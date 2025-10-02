import React from 'react';

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const radius = 42.5;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((acc, item) => acc + (isFinite(item.value) ? item.value : 0), 0);

  // If there's nothing to show, render an empty muted circle
  if (total === 0) {
    return (
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth="15" />
        </svg>
      </div>
    );
  }

  let accumulatedLength = 0; // in px (along circumference)

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" className="transform -rotate-90">
        {data.map((item, index) => {
          const value = isFinite(item.value) ? item.value : 0;
          const dash = (value / total) * circumference;
          const gap = Math.max(0, circumference - dash);

          // strokeDasharray and strokeDashoffset must be in same units (px along path)
          const strokeDasharray = `${dash} ${gap}`;

          // We offset each slice so it starts where the previous one ended.
          const strokeDashoffset = circumference - accumulatedLength;
          accumulatedLength += dash;

          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth="15"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dashoffset 0.6s, stroke-dasharray 0.6s' }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DonutChart;