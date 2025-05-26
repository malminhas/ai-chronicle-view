
import { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";
import { References } from "./References";
import { CompactTimeline } from "./CompactTimeline";
import { HorizontalTimeline } from "./HorizontalTimeline";
import { timelineData, TimelineEventData } from "@/data/timelineData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Layout, List, ArrowRight } from "lucide-react";

export type { TimelineEventData };

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <Tabs defaultValue="compact" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700">
            <TabsTrigger value="detailed" className="flex items-center gap-2 text-xs sm:text-sm">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Detailed</span>
            </TabsTrigger>
            <TabsTrigger value="horizontal" className="flex items-center gap-2 text-xs sm:text-sm">
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">Horizontal</span>
            </TabsTrigger>
            <TabsTrigger value="compact" className="flex items-center gap-2 text-xs sm:text-sm">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Compact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="detailed" className="mt-8">
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
          </TabsContent>

          <TabsContent value="horizontal" className="mt-8">
            <HorizontalTimeline 
              events={timelineData}
              onEventClick={setSelectedEvent}
            />
          </TabsContent>

          <TabsContent value="compact" className="mt-8">
            <CompactTimeline 
              events={timelineData}
              onEventClick={setSelectedEvent}
            />
          </TabsContent>
        </Tabs>
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
