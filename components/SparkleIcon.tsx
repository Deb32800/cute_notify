
import React from 'react';

interface SparkleIconProps {
  className?: string;
}

const SparkleIcon: React.FC<SparkleIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.688-1.688L11.813 11l2.188-1.25a2.25 2.25 0 001.688-1.688L17 5.813l1.25 2.188a2.25 2.25 0 001.688 1.688L22.188 11l-2.188 1.25a2.25 2.25 0 00-1.688 1.688z" />
    </svg>
  );
};

export default SparkleIcon;
