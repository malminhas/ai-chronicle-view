
import { TimelineEventData } from "@/data/timelineData";

const STORAGE_KEY = 'ai-timeline-data';

export const extractDataFromLocalStorage = (): TimelineEventData[] | null => {
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
    console.error('Failed to extract data from localStorage:', error);
  }
  return null;
};

export const logCurrentStorageData = () => {
  const data = extractDataFromLocalStorage();
  if (data) {
    console.log('Current localStorage data:', JSON.stringify(data, null, 2));
    console.log(`Found ${data.length} events in localStorage`);
    const eventsWithReferences = data.filter(event => event.references && event.references.length > 0);
    console.log(`${eventsWithReferences.length} events have references`);
  } else {
    console.log('No valid data found in localStorage');
  }
};
