
import { useState, useEffect } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";

interface CompactTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const CompactTimeline = ({ events, onEventClick }: CompactTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to get columns based on screen size (matching Tailwind breakpoints)
  const getColumnsForScreenSize = () => {
    if (windowWidth >= 1280) return 5; // xl
    if (windowWidth >= 1024) return 4; // lg
    if (windowWidth >= 768) return 3;  // md
    if (windowWidth >= 640) return 2;  // sm
    return 1; // default
  };

  const cols = getColumnsForScreenSize();
  const totalRows = Math.ceil(events.length / cols);
  const containerHeight = totalRows * 200; // 200px per row

  return (
    <div className="mb-16">
      {/* Grid timeline container */}
      <div className="relative" style={{ height: `${containerHeight}px` }}>
        {/* Timeline connecting lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 1 }}
          viewBox={`0 0 100 ${containerHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          {events.map((_, index) => {
            if (index === events.length - 1) return null;
            
            const currentRow = Math.floor(index / cols);
            const currentCol = index % cols;
            const nextIndex = index + 1;
            const nextRow = Math.floor(nextIndex / cols);
            const nextCol = nextIndex % cols;
            
            // Calculate positions as percentages
            const cellWidth = 100 / cols;
            const rowHeight = 200;
            
            // For snaking pattern, adjust column positions for odd rows (right-to-left)
            const isCurrentRowOdd = currentRow % 2 === 1;
            const isNextRowOdd = nextRow % 2 === 1;
            
            // Adjust column positions for snaking
            const adjustedCurrentCol = isCurrentRowOdd ? (cols - 1 - currentCol) : currentCol;
            const adjustedNextCol = isNextRowOdd ? (cols - 1 - nextCol) : nextCol;
            
            const x1 = adjustedCurrentCol * cellWidth + cellWidth / 2;
            const y1 = currentRow * rowHeight + 100; // Center of the dot
            
            if (currentRow !== nextRow) {
              // Moving to next row - create L-shaped path
              const x2 = adjustedNextCol * cellWidth + cellWidth / 2;
              const y2 = nextRow * rowHeight + 100;
              
              // Create L-shaped path: horizontal then vertical
              let pathData;
              if (isCurrentRowOdd) {
                // Current row is right-to-left, so go to left edge then down then to first position
                const leftEdge = cellWidth / 2;
                pathData = `M ${x1} ${y1} L ${leftEdge} ${y1} L ${leftEdge} ${y2} L ${x2} ${y2}`;
              } else {
                // Current row is left-to-right, so go to right edge then down then to last position
                const rightEdge = 100 - cellWidth / 2;
                pathData = `M ${x1} ${y1} L ${rightEdge} ${y1} L ${rightEdge} ${y2} L ${x2} ${y2}`;
              }
              
              return (
                <path
                  key={`path-${index}`}
                  d={pathData}
                  stroke="url(#timelineGradient)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.8"
                  className="drop-shadow-sm"
                />
              );
            } else {
              // Same row: straight horizontal line
              const x2 = adjustedNextCol * cellWidth + cellWidth / 2;
              const y2 = nextRow * rowHeight + 100;
              
              return (
                <line
                  key={`line-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#timelineGradient)"
                  strokeWidth="3"
                  opacity="0.8"
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
            
            // Calculate snaking position
            const row = Math.floor(index / cols);
            const col = index % cols;
            const isRowOdd = row % 2 === 1;
            const adjustedCol = isRowOdd ? (cols - 1 - col) : col;
            
            return (
              <div
                key={eventKey}
                className="relative flex flex-col items-center cursor-pointer group h-48"
                style={{ 
                  order: isRowOdd ? (row * cols + (cols - 1 - col)) : index
                }}
                onMouseEnter={() => setHoveredEvent(eventKey)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onEventClick(event)}
              >
                {/* Timeline dot */}
                <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10 mb-4`}></div>
                
                {/* Event card */}
                <div className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20 transform scale-105' : ''} w-full flex-1`}>
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
