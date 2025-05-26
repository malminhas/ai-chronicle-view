
import { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";

interface SnakingTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const SnakingTimeline = ({ events, onEventClick }: SnakingTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Debounced hover handlers to prevent rapid state changes
  const handleMouseEnter = useCallback((eventKey: string) => {
    setHoveredEvent(eventKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredEvent(null);
  }, []);

  // Group events into rows of 4
  const rows = [];
  for (let i = 0; i < events.length; i += 4) {
    const row = events.slice(i, i + 4);
    const isEvenRow = Math.floor(i / 4) % 2 === 0;
    rows.push({ events: isEvenRow ? row : row.reverse(), isReversed: !isEvenRow });
  }

  return (
    <div className="mb-16">
      <div className="space-y-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative">
            {/* Row of events */}
            <div className="grid grid-cols-4 gap-6">
              {row.events.map((event, eventIndex) => {
                const colorClasses = getCategoryColor(event.category);
                const isHovered = hoveredEvent === `${event.year}-${event.event}`;
                const eventKey = `${event.year}-${event.event}`;
                
                return (
                  <div
                    key={eventKey}
                    className="relative flex flex-col items-center cursor-pointer group"
                    style={{ contain: 'layout style paint' }}
                    onMouseEnter={() => handleMouseEnter(eventKey)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => onEventClick(event)}
                  >
                    {/* Timeline dot */}
                    <div 
                      className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg z-10 mb-4 will-change-transform`}
                      style={{
                        transform: isHovered ? 'scale3d(1.25, 1.25, 1)' : 'scale3d(1, 1, 1)',
                        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    ></div>
                    
                    {/* Event card */}
                    <div 
                      className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg w-full will-change-transform`}
                      style={{
                        transform: isHovered ? 'scale3d(1.05, 1.05, 1)' : 'scale3d(1, 1, 1)',
                        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s ease, box-shadow 0.2s ease',
                        borderColor: isHovered ? 'rgba(96, 165, 250, 0.5)' : 'rgb(71, 85, 105)',
                        boxShadow: isHovered ? '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Year */}
                      <div className="text-lg font-bold text-white mb-2 text-center">{event.year}</div>
                      
                      {/* Event title */}
                      <h3 className="text-sm font-semibold text-blue-300 text-center leading-tight line-clamp-2"
                          style={{
                            color: isHovered ? 'rgb(196, 181, 253)' : 'rgb(147, 197, 253)',
                            transition: 'color 0.2s ease'
                          }}>
                        {event.event}
                      </h3>
                      
                      {/* Pre-allocated space for hover text to prevent layout shift */}
                      <div className="mt-3 h-4 flex items-center justify-center">
                        {isHovered && (
                          <div 
                            className="text-blue-400 text-xs font-medium text-center"
                            style={{
                              opacity: isHovered ? 1 : 0,
                              transition: 'opacity 0.15s ease-in-out'
                            }}
                          >
                            Click for details →
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Horizontal connecting line across all dots in the row */}
            {row.events.length > 1 && (
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 z-0"></div>
            )}

            {/* Direction chevron in the middle of the row */}
            {row.events.length > 1 && rowIndex < rows.length - 1 && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-1.5 border border-slate-600 shadow-lg animate-pulse">
                  {row.isReversed ? (
                    <ChevronLeft className="w-4 h-4 text-purple-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              </div>
            )}

            {/* Vertical connecting line to next row */}
            {rowIndex < rows.length - 1 && (
              <div className={`absolute ${row.isReversed ? 'left-0' : 'right-0'} w-0.5 bg-gradient-to-b from-purple-400 to-cyan-400 z-0`} 
                   style={{ 
                     top: '8px', 
                     height: 'calc(100% + 40px - 8px)'
                   }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
