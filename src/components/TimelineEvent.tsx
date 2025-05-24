
import { useState } from "react";
import { TimelineEventData } from "./Timeline";

interface TimelineEventProps {
  eventData: TimelineEventData;
  index: number;
  onClick: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'philosophical-foundations':
      return 'from-violet-400 to-purple-500';
    case 'early-ai':
      return 'from-amber-400 to-orange-500';
    case 'symbolic-ai':
      return 'from-yellow-400 to-amber-500';
    case 'ai-winter':
      return 'from-slate-400 to-slate-600';
    case 'machine-learning':
      return 'from-green-400 to-emerald-500';
    case 'rise-of-statistical-methods':
      return 'from-teal-400 to-cyan-500';
    case 'technological-milestone':
      return 'from-blue-400 to-indigo-500';
    case 'generative-ai':
      return 'from-pink-400 to-rose-500';
    case 'transformers':
      return 'from-indigo-400 to-blue-500';
    case 'ai-applications':
      return 'from-emerald-400 to-green-500';
    case 'ai-ethics':
      return 'from-red-400 to-pink-500';
    case 'multimodal-ai':
      return 'from-purple-400 to-pink-500';
    case 'open-source-ai':
      return 'from-orange-400 to-red-500';
    case 'ai-future':
      return 'from-cyan-400 to-blue-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'philosophical-foundations':
      return 'Philosophical Foundations';
    case 'early-ai':
      return 'Early AI';
    case 'symbolic-ai':
      return 'Symbolic AI';
    case 'ai-winter':
      return 'AI Winter';
    case 'machine-learning':
      return 'Machine Learning';
    case 'rise-of-statistical-methods':
      return 'Statistical Methods';
    case 'technological-milestone':
      return 'Technological Milestone';
    case 'generative-ai':
      return 'Generative AI';
    case 'transformers':
      return 'Transformers';
    case 'ai-applications':
      return 'AI Applications';
    case 'ai-ethics':
      return 'AI Ethics';
    case 'multimodal-ai':
      return 'Multimodal AI';
    case 'open-source-ai':
      return 'Open-Source AI';
    case 'ai-future':
      return 'AI Future';
    default:
      return 'Unknown';
  }
};

export const TimelineEvent = ({ eventData, index, onClick }: TimelineEventProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = index % 2 === 0;
  const colorClasses = getCategoryColor(eventData.category);

  return (
    <div 
      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10`}></div>
      
      {/* Content card */}
      <div 
        className={`w-5/12 ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'} cursor-pointer transition-all duration-300 ${isHovered ? 'transform scale-105' : ''}`}
        onClick={onClick}
      >
        <div className={`bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20' : ''}`}>
          {/* Category badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${colorClasses} text-white`}>
            {getCategoryLabel(eventData.category)}
          </div>
          
          {/* Year */}
          <div className="text-2xl font-bold text-white mb-2">{eventData.year}</div>
          
          {/* Event title */}
          <h3 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">
            {eventData.event}
          </h3>
          
          {/* Description preview */}
          <p className="text-slate-300 text-sm leading-relaxed">
            {eventData.description.length > 120 
              ? `${eventData.description.substring(0, 120)}...` 
              : eventData.description
            }
          </p>
          
          {/* Hover indicator */}
          {isHovered && (
            <div className="mt-4 text-blue-400 text-sm font-medium animate-fade-in">
              Click to read more →
            </div>
          )}
        </div>
        
        {/* Connector line */}
        <div className={`absolute top-1/2 ${isLeft ? 'right-0' : 'left-0'} w-8 h-0.5 bg-gradient-to-r ${colorClasses} transform -translate-y-1/2 transition-all duration-300 ${isHovered ? 'w-12' : ''}`}></div>
      </div>
    </div>
  );
};
