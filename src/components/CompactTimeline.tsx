
import { useState } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";

interface CompactTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const CompactTimeline = ({ events, onEventClick }: CompactTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <div className="mb-16">
      {/* Grid timeline container */}
      <div className="relative">
        {/* Timeline connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          {events.map((_, index) => {
            if (index === events.length - 1) return null;
            
            // Calculate grid positions
            const cols = 5; // xl:grid-cols-5 is the largest grid
            const currentRow = Math.floor(index / cols);
            const currentCol = index % cols;
            const nextRow = Math.floor((index + 1) / cols);
            const nextCol = (index + 1) % cols;
            
            // Calculate approximate positions (these will be rough estimates)
            const cellWidth = 100 / cols;
            const cellHeight = 200; // Approximate height per row
            
            const x1 = `${currentCol * cellWidth + cellWidth / 2}%`;
            const y1 = currentRow * cellHeight + 60; // Offset for dot position
            const x2 = `${nextCol * cellWidth + cellWidth / 2}%`;
            const y2 = nextRow * cellHeight + 60;
            
            return (
              <line
                key={`line-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#timelineGradient)"
                strokeWidth="2"
                opacity="0.6"
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 relative" style={{ zIndex: 2 }}>
          {events.map((event, index) => {
            const colorClasses = getCategoryColor(event.category);
            const isHovered = hoveredEvent === `${event.year}-${event.event}`;
            const eventKey = `${event.year}-${event.event}`;
            
            return (
              <div
                key={eventKey}
                className="relative flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredEvent(eventKey)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onEventClick(event)}
              >
                {/* Timeline dot */}
                <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10 mb-4`}></div>
                
                {/* Event card */}
                <div className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20 transform scale-105' : ''} w-full`}>
                  {/* Year */}
                  <div className="text-xl font-bold text-white mb-2 text-center">{event.year}</div>
                  
                  {/* Event title */}
                  <h3 className="text-sm font-semibold text-blue-300 text-center leading-tight group-hover:text-blue-200 transition-colors">
                    {event.event}
                  </h3>
                  
                  {/* Hover indicator */}
                  {isHovered && (
                    <div className="mt-3 text-blue-400 text-xs font-medium animate-fade-in text-center">
                      Click for details →
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Info text */}
      <div className="text-center text-slate-400 text-sm mt-6">
        Click on any event to see more details
      </div>
    </div>
  );
};
