
import { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";
import { References } from "./References";
import { CompactTimeline } from "./CompactTimeline";
import { timelineData, TimelineEventData } from "@/data/timelineData";
import { Switch } from "@/components/ui/switch";
import { Layout, List } from "lucide-react";

export type { TimelineEventData };

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);
  const [isCompactView, setIsCompactView] = useState(true);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 text-slate-300">
          <List className="w-5 h-5" />
          <span className="text-sm font-medium">Detailed View</span>
        </div>
        <Switch
          checked={isCompactView}
          onCheckedChange={setIsCompactView}
          className="data-[state=checked]:bg-blue-600"
        />
        <div className="flex items-center gap-2 text-slate-300">
          <Layout className="w-5 h-5" />
          <span className="text-sm font-medium">Horizontal View</span>
        </div>
      </div>

      {isCompactView ? (
        <CompactTimeline 
          events={timelineData}
          onEventClick={setSelectedEvent}
        />
      ) : (
        <>
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
        </>
      )}

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
