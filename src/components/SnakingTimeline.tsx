
import { useState } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";

interface SnakingTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const SnakingTimeline = ({ events, onEventClick }: SnakingTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

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
                    onMouseEnter={() => setHoveredEvent(eventKey)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    onClick={() => onEventClick(event)}
                  >
                    {/* Timeline dot */}
                    <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10 mb-4`}></div>
                    
                    {/* Event card */}
                    <div className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20 transform scale-105' : ''} w-full`}>
                      {/* Year */}
                      <div className="text-lg font-bold text-white mb-2 text-center">{event.year}</div>
                      
                      {/* Event title */}
                      <h3 className="text-sm font-semibold text-blue-300 text-center leading-tight group-hover:text-blue-200 transition-colors line-clamp-2">
                        {event.event}
                      </h3>
                      
                      {/* Hover indicator */}
                      {isHovered && (
                        <div className="mt-3 text-blue-400 text-xs font-medium animate-fade-in text-center">
                          Click for details →
                        </div>
                      )}
                    </div>

                    {/* Connecting line to next event (horizontal) */}
                    {eventIndex < row.events.length - 1 && (
                      <div className="absolute top-2 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform translate-x-1/2 z-0"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vertical connecting line to next row */}
            {rowIndex < rows.length - 1 && (
              <div className={`absolute ${row.isReversed ? 'left-1/4' : 'right-1/4'} w-0.5 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 transform translate-x-1/2 mt-4 z-0`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
