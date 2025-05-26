
import { TimelineEventData } from "@/data/timelineData";

// Valid categories for validation
const VALID_CATEGORIES = [
  'philosophical-foundations',
  'early-ai',
  'symbolic-ai',
  'ai-winter',
  'machine-learning',
  'rise-of-statistical-methods',
  'technological-milestone',
  'generative-ai',
  'transformers',
  'ai-applications',
  'ai-ethics',
  'multimodal-ai',
  'open-source-ai',
  'robotics',
  'ai-policy',
  'cultural-impact',
  'speculative'
] as const;

export const exportToCSV = (events: TimelineEventData[]): void => {
  const headers = ['year', 'event', 'description', 'category'];
  const csvContent = [
    headers.join(','),
    ...events.map(event => [
      `"${event.year.replace(/"/g, '""')}"`,
      `"${event.event.replace(/"/g, '""')}"`,
      `"${event.description.replace(/"/g, '""')}"`,
      `"${event.category.replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'ai-timeline-data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateCSVContent = (content: string): { isValid: boolean; errors: string[]; data?: TimelineEventData[] } => {
  const errors: string[] = [];
  const lines = content.trim().split('\n');
  
  if (lines.length < 2) {
    return { isValid: false, errors: ['CSV file must contain at least a header row and one data row'] };
  }

  // Validate header
  const header = lines[0].toLowerCase().replace(/"/g, '');
  const expectedHeaders = ['year', 'event', 'description', 'category'];
  const actualHeaders = header.split(',').map(h => h.trim());
  
  if (!expectedHeaders.every(h => actualHeaders.includes(h))) {
    errors.push(`CSV header must contain columns: ${expectedHeaders.join(', ')}`);
  }

  // Get header indices
  const yearIndex = actualHeaders.indexOf('year');
  const eventIndex = actualHeaders.indexOf('event');
  const descriptionIndex = actualHeaders.indexOf('description');
  const categoryIndex = actualHeaders.indexOf('category');

  const data: TimelineEventData[] = [];
  
  // Validate data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV row (handle quoted fields)
    const fields = parseCSVRow(line);
    
    if (fields.length < 4) {
      errors.push(`Row ${i + 1}: Insufficient columns (expected 4, got ${fields.length})`);
      continue;
    }

    const year = fields[yearIndex]?.trim();
    const event = fields[eventIndex]?.trim();
    const description = fields[descriptionIndex]?.trim();
    const category = fields[categoryIndex]?.trim();

    // Validate required fields
    if (!year) errors.push(`Row ${i + 1}: Year is required`);
    if (!event) errors.push(`Row ${i + 1}: Event is required`);
    if (!description) errors.push(`Row ${i + 1}: Description is required`);
    if (!category) errors.push(`Row ${i + 1}: Category is required`);

    // Validate year format - updated to handle "1950s-1980s" format
    if (year && !/^\d{4}(s)?(-\d{4}(s)?)?s?$/.test(year)) {
      errors.push(`Row ${i + 1}: Year must be in format YYYY, YYYY-YYYY, YYYYs, or YYYYs-YYYYs`);
    }

    // Validate category
    if (category && !VALID_CATEGORIES.includes(category as any)) {
      errors.push(`Row ${i + 1}: Invalid category "${category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
    }

    // Validate text length (security measure)
    if (event && event.length > 500) {
      errors.push(`Row ${i + 1}: Event title too long (max 500 characters)`);
    }
    if (description && description.length > 2000) {
      errors.push(`Row ${i + 1}: Description too long (max 2000 characters)`);
    }

    // Check for potentially malicious content
    if (containsSuspiciousContent(event) || containsSuspiciousContent(description)) {
      errors.push(`Row ${i + 1}: Content contains potentially unsafe characters`);
    }

    if (year && event && description && category && errors.length === 0) {
      data.push({
        year,
        event,
        description,
        category: category as TimelineEventData['category']
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? data : undefined
  };
};

const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i++; // Skip next quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

const containsSuspiciousContent = (text: string): boolean => {
  // Check for script tags, javascript:, data:, and other potentially malicious content
  const suspiciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<link/gi,
    /<meta/gi
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(text));
};
