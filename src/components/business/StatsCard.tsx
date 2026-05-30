import React from 'react';

interface StatsCardProps {
  id: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  id,
  title,
  value,
  icon,
  iconBgColor = 'bg-zinc-800/80',
  textColor = 'text-white',
  onClick
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl p-4 bg-zinc-900 border border-zinc-900/80 hover:border-zinc-800 transition-all duration-200 cursor-pointer flex justify-between items-center`}
    >
      <div>
        <span id={`${id}-title`} className="text-xs text-zinc-400 font-sans tracking-wide">
          {title}
        </span>
        <h3 id={`${id}-value`} className={`text-2xl font-bold font-sans tracking-tight mt-1 ${textColor}`}>
          {value}
        </h3>
      </div>
      
      <div id={`${id}-icon-outer`} className={`p-2.5 rounded-xl ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  );
};
