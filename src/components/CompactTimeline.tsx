
import { useState } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";

interface CompactTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const CompactTimeline = ({ events, onEventClick }: CompactTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Function to get columns based on screen size (matching Tailwind breakpoints)
  const getColumnsForScreenSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1280) return 5; // xl
      if (width >= 1024) return 4; // lg
      if (width >= 768) return 3;  // md
      if (width >= 640) return 2;  // sm
      return 1; // default
    }
    return 5; // fallback for SSR
  };

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
            
            // Use a fixed column count for consistent line drawing
            const cols = 5; // This will work for xl screens, and scale down appropriately
            const currentRow = Math.floor(index / cols);
            const currentCol = index % cols;
            const nextIndex = index + 1;
            const nextRow = Math.floor(nextIndex / cols);
            const nextCol = nextIndex % cols;
            
            // Calculate positions
            const cellWidth = 100 / cols;
            const cellHeight = 180; // Adjusted for better spacing
            
            const x1 = `${currentCol * cellWidth + cellWidth / 2}%`;
            const y1 = currentRow * cellHeight + 80;
            
            let x2, y2;
            let pathData = "";
            
            if (currentRow !== nextRow) {
              // Snake pattern: at end of row, create L-shaped path to start of next row
              const midY = y1 + 40;
              const nextY = nextRow * cellHeight + 80;
              
              // Create path that goes down then across to start of next row
              pathData = `M ${x1} ${y1} L ${x1} ${midY} L ${cellWidth / 2}% ${midY} L ${cellWidth / 2}% ${nextY}`;
              
              return (
                <path
                  key={`path-${index}`}
                  d={pathData}
                  stroke="url(#timelineGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                  className="drop-shadow-sm"
                />
              );
            } else {
              // Same row: straight horizontal line
              x2 = `${nextCol * cellWidth + cellWidth / 2}%`;
              y2 = nextRow * cellHeight + 80;
              
              return (
                <line
                  key={`line-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#timelineGradient)"
                  strokeWidth="2"
                  opacity="0.7"
                  className="drop-shadow-sm"
                />
              );
            }
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
