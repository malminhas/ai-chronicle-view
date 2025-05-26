
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
      {/* Horizontal timeline container */}
      <div className="relative overflow-x-auto pb-8">
        <div className="flex items-center min-w-max px-4">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full shadow-lg shadow-blue-500/20 transform -translate-y-1/2"></div>
          
          {/* Timeline events */}
          {events.map((event, index) => {
            const colorClasses = getCategoryColor(event.category);
            const isHovered = hoveredEvent === `${event.year}-${event.event}`;
            const eventKey = `${event.year}-${event.event}`;
            
            return (
              <div
                key={eventKey}
                className="relative flex flex-col items-center cursor-pointer group"
                style={{ minWidth: '200px' }}
                onMouseEnter={() => setHoveredEvent(eventKey)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onEventClick(event)}
              >
                {/* Timeline dot */}
                <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10 mb-4`}></div>
                
                {/* Event card */}
                <div className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20 transform scale-105' : ''} max-w-[180px]`}>
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
      
      {/* Scroll hint */}
      <div className="text-center text-slate-400 text-sm mt-4">
        ← Scroll horizontally to explore the timeline →
      </div>
    </div>
  );
};
