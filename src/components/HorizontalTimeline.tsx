
import { useState } from "react";
import { TimelineEventData } from "@/data/timelineData";
import { getCategoryColor } from "@/utils/categoryUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface HorizontalTimelineProps {
  events: TimelineEventData[];
  onEventClick: (event: TimelineEventData) => void;
}

export const HorizontalTimeline = ({ events, onEventClick }: HorizontalTimelineProps) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <div className="mb-16 px-8">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event, index) => {
            const colorClasses = getCategoryColor(event.category);
            const isHovered = hoveredEvent === `${event.year}-${event.event}`;
            const eventKey = `${event.year}-${event.event}`;
            
            return (
              <CarouselItem key={eventKey} className="pl-2 md:pl-4 basis-80">
                <div
                  className="relative flex flex-col cursor-pointer group h-full"
                  onMouseEnter={() => setHoveredEvent(eventKey)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  onClick={() => onEventClick(event)}
                >
                  {/* Connecting line - horizontal */}
                  {index < events.length - 1 && (
                    <div className="absolute top-6 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 z-0"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`w-4 h-4 bg-gradient-to-r ${colorClasses} rounded-full border-4 border-slate-900 shadow-lg transition-all duration-300 ${isHovered ? 'scale-125 shadow-xl' : ''} z-10 mb-4 mx-auto`}></div>
                  
                  {/* Event card */}
                  <div className={`bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg border border-slate-600 shadow-lg transition-all duration-300 ${isHovered ? 'border-blue-400/50 shadow-blue-500/20 transform scale-105' : ''} h-full flex flex-col`}>
                    {/* Year */}
                    <div className="text-xl font-bold text-white mb-2 text-center">{event.year}</div>
                    
                    {/* Event title */}
                    <h3 className="text-sm font-semibold text-blue-300 text-center leading-tight group-hover:text-blue-200 transition-colors flex-grow">
                      {event.event}
                    </h3>
                    
                    {/* Brief description */}
                    <p className="text-xs text-slate-400 mt-2 text-center line-clamp-3">
                      {event.description.substring(0, 120)}...
                    </p>
                    
                    {/* Hover indicator */}
                    {isHovered && (
                      <div className="mt-3 text-blue-400 text-xs font-medium animate-fade-in text-center">
                        Click for details →
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
      
      {/* Info text */}
      <div className="text-center text-slate-400 text-sm mt-6">
        Use the arrow keys or buttons to navigate • Click on any event to see more details
      </div>
    </div>
  );
};
