
import { useState } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";
import { References } from "./References";
import { CompactTimeline } from "./CompactTimeline";
import { SnakingTimeline } from "./SnakingTimeline";
import { timelineData, TimelineEventData } from "@/data/timelineData";
import { List, Layout, Grid3X3 } from "lucide-react";

export type { TimelineEventData };

type ViewType = 'detailed' | 'horizontal' | 'compact';

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('detailed');

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700">
        <button
          onClick={() => setCurrentView('detailed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'detailed' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <List className="w-5 h-5" />
          <span className="text-sm font-medium">Detailed View</span>
        </button>

        <button
          onClick={() => setCurrentView('horizontal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'horizontal' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Layout className="w-5 h-5" />
          <span className="text-sm font-medium">Horizontal View</span>
        </button>

        <button
          onClick={() => setCurrentView('compact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            currentView === 'compact' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Grid3X3 className="w-5 h-5" />
          <span className="text-sm font-medium">Compact View</span>
        </button>
      </div>

      {/* Render the appropriate view */}
      {currentView === 'horizontal' ? (
        <CompactTimeline 
          events={timelineData}
          onEventClick={setSelectedEvent}
        />
      ) : currentView === 'compact' ? (
        <SnakingTimeline 
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
