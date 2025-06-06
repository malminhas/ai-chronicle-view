
import { useState, useEffect } from "react";
import { Timeline } from "@/components/Timeline";
import { About } from "@/components/About";
import { timelineData } from "@/data/timelineData";

const STORAGE_KEY = 'ai-timeline-data';

const Index = () => {
  const [events, setEvents] = useState(timelineData);

  useEffect(() => {
    // Function to load data from localStorage
    const loadStorageData = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored);
          // Validate that it's an array with the right structure
          if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].year && parsedData[0].event) {
            setEvents(parsedData);
          }
        } else {
          // If no stored data, use the default timeline data
          setEvents(timelineData);
        }
      } catch (error) {
        console.log('Failed to load timeline data from localStorage:', error);
        setEvents(timelineData);
      }
    };

    // Load data initially
    loadStorageData();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadStorageData();
      }
    };

    // Listen for custom storage events (for changes within the same tab)
    const handleCustomStorageChange = () => {
      loadStorageData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('timeline-data-changed', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('timeline-data-changed', handleCustomStorageChange);
    };
  }, []);

  const totalEvents = events.length;
  const firstEvent = events[0]?.event || "the earliest milestones";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            The Evolution of Artificial Intelligence
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Journey through the {totalEvents} key milestones that shaped modern AI, from {firstEvent} to today's multimodal models
          </p>
        </div>
        <Timeline />
      </div>
      <About />
    </div>
  );
};

export default Index;
