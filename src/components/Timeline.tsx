
import { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";
import { References } from "./References";
import { timelineData, TimelineEventData } from "@/data/timelineData";

export type { TimelineEventData };

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 h-full rounded-full shadow-lg shadow-blue-500/20"></div>
      
      {/* Timeline events */}
      <div className="space-y-8">
        {timelineData.map((eventData, index) => (
          <TimelineEvent
            key={`${eventData.year}-${eventData.event}`}
            eventData={eventData}
            index={index}
            onClick={() => setSelectedEvent(eventData)}
          />
        ))}
      </div>

      {/* References section */}
      <References />

      {/* Event modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};
