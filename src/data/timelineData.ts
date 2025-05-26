
import timelineEventsData from './timelineEvents.json';

export interface TimelineEventData {
  year: string;
  event: string;
  description: string;
  category: 'philosophical-foundations' | 'early-ai' | 'symbolic-ai' | 'ai-winter' | 'machine-learning' | 'rise-of-statistical-methods' | 'technological-milestone' | 'generative-ai' | 'transformers' | 'ai-applications' | 'ai-ethics' | 'multimodal-ai' | 'open-source-ai' | 'robotics' | 'ai-policy' | 'cultural-impact' | 'speculative' | 'government-initiative';
  references?: string[];
}

// Load timeline data from JSON file with proper type assertion
export const timelineData: TimelineEventData[] = timelineEventsData as TimelineEventData[];
