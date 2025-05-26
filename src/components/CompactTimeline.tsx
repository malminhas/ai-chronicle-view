
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

  // Calculate actual layout dimensions
  const maxWidth = Math.min(windowWidth - 32, 1152); // Container max width with padding
  const gapSize = 24; // gap-6 = 24px
  const totalGaps = (cols - 1) * gapSize;
  const availableWidth = maxWidth - totalGaps;
  const cellWidth = availableWidth / cols;
  const rowHeight = 200;

  const getEventPosition = (index: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const isRowOdd = row % 2 === 1;
    
    // For odd rows, reverse the column order (right to left)
    const adjustedCol = isRowOdd ? (cols - 1 - col) : col;
    
    const x = adjustedCol * (cellWidth + gapSize) + cellWidth / 2;
    const y = row * rowHeight + 16; // 16px from top for dot position
    
    return { x, y, row, col: adjustedCol };
  };

  return (
    <div className="mb-16">
      {/* Grid timeline container */}
      <div className="relative max-w-6xl mx-auto px-4" style={{ height: `${containerHeight}px` }}>
        {/* Timeline connecting lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          style={{ left: '16px', right: '16px', width: `${maxWidth}px` }}
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
            
            const currentPos = getEventPosition(index);
            const nextPos = getEventPosition(index + 1);
            
            // If moving to next row, create L-shaped path
            if (currentPos.row !== nextPos.row) {
              const isCurrentRowOdd = currentPos.row % 2 === 1;
              
              if (isCurrentRowOdd) {
                // Current row goes right-to-left, so connect via left edge
                const pathData = `M ${currentPos.x} ${currentPos.y} L 0 ${currentPos.y} L 0 ${nextPos.y} L ${nextPos.x} ${nextPos.y}`;
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
                // Current row goes left-to-right, so connect via right edge
                const pathData = `M ${currentPos.x} ${currentPos.y} L ${maxWidth} ${currentPos.y} L ${maxWidth} ${nextPos.y} L ${nextPos.x} ${nextPos.y}`;
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
              }
            } else {
              // Same row: straight horizontal line
              return (
                <line
                  key={`line-${index}`}
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="url(#timelineGradient)"
                  strokeWidth="3"
                  opacity="0.8"
                  className="drop-shadow-sm"
                />
              );
            }
          })}
        </svg>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-20">
          {events.map((event, index) => {
            const colorClasses = getCategoryColor(event.category);
            const isHovered = hoveredEvent === `${event.year}-${event.event}`;
            const eventKey = `${event.year}-${event.event}`;
            
            // Calculate snaking position
            const row = Math.floor(index / cols);
            const col = index % cols;
            const isRowOdd = row % 2 === 1;
            
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
                <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-30 mb-4`}></div>
                
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
