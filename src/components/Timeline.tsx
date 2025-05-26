
import { useState, useEffect } from "react";
import { TimelineEvent } from "./TimelineEvent";
import { EventModal } from "./EventModal";
import { References } from "./References";
import { CompactTimeline } from "./CompactTimeline";
import { SnakingTimeline } from "./SnakingTimeline";
import { CSVManager } from "./CSVManager";
import { timelineData, TimelineEventData } from "@/data/timelineData";
import { logCurrentStorageData, extractDataFromLocalStorage } from "@/utils/syncLocalStorageToJson";
import { List, Layout, Grid3X3, Info } from "lucide-react";

export type { TimelineEventData };

type ViewType = 'detailed' | 'horizontal' | 'compact';

const STORAGE_KEY = 'ai-timeline-data';

export const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('compact');
  const [events, setEvents] = useState<TimelineEventData[]>(() => {
    // Try to load user customizations from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Validate that it's an array with the right structure
        if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].year && parsedData[0].event) {
          return parsedData;
        }
      }
    } catch (error) {
      console.log('Failed to load timeline data from localStorage:', error);
    }
    // Use the updated baseline data (which now includes your imported data)
    return timelineData;
  });

  // Log current storage data on component mount for debugging
  useEffect(() => {
    console.log('=== Timeline Data Analysis ===');
    logCurrentStorageData();
    
    const storageData = extractDataFromLocalStorage();
    if (storageData) {
      console.log('Sample storage event with references:', 
        storageData.find(event => event.references && event.references.length > 0)
      );
    }
    
    console.log('Current events state count:', events.length);
    const eventsWithRefs = events.filter(event => event.references && event.references.length > 0);
    console.log('Events with references in current state:', eventsWithRefs.length);
  }, []);

  const handleImport = (importedEvents: TimelineEventData[]) => {
    setEvents(importedEvents);
    // Persist user customizations to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(importedEvents));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('timeline-data-changed'));
    } catch (error) {
      console.error('Failed to save timeline data to localStorage:', error);
    }
  };

  const handleReset = () => {
    setEvents(timelineData);
    // Clear localStorage to revert to the updated baseline data
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('timeline-data-changed'));
    } catch (error) {
      console.error('Failed to clear timeline data from localStorage:', error);
    }
  };

  const handleSyncToJson = () => {
    console.log('=== Debug Storage Button Clicked ===');
    
    try {
      const storageData = extractDataFromLocalStorage();
      console.log('Raw storage data result:', storageData);
      
      if (storageData && storageData.length > 0) {
        console.log('=== COPY THIS DATA TO UPDATE timelineEvents.json ===');
        console.log(JSON.stringify(storageData, null, 2));
        console.log('=== END OF DATA ===');
        
        // Show summary
        const withRefs = storageData.filter(event => event.references && event.references.length > 0);
        console.log(`📊 Summary: ${storageData.length} total events, ${withRefs.length} events with references`);
        
        // Show a sample event with references for verification
        const sampleWithRefs = storageData.find(event => event.references && event.references.length > 0);
        if (sampleWithRefs) {
          console.log('📋 Sample event with references:', sampleWithRefs);
        }
      } else {
        console.log('❌ No localStorage data found to sync');
        console.log('Current localStorage content:', localStorage.getItem(STORAGE_KEY));
      }
    } catch (error) {
      console.error('❌ Error in handleSyncToJson:', error);
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700">
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
          onClick={handleSyncToJson}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50"
          title="Log localStorage data to console for JSON sync"
        >
          <Info className="w-5 h-5" />
          <span className="text-sm font-medium">Debug Storage</span>
        </button>
      </div>

      {/* Render the appropriate view */}
      {currentView === 'horizontal' ? (
        <CompactTimeline 
          events={events}
          onEventClick={setSelectedEvent}
        />
      ) : currentView === 'compact' ? (
        <SnakingTimeline 
          events={events}
          onEventClick={setSelectedEvent}
        />
      ) : (
        <>
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 h-full rounded-full shadow-lg shadow-blue-500/20"></div>
          
          {/* Timeline events */}
          <div className="space-y-8">
            {events.map((eventData, index) => (
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

      {/* CSV Management - moved to bottom */}
      <div className="mt-12">
        <CSVManager events={events} onImport={handleImport} onReset={handleReset} />
      </div>

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
