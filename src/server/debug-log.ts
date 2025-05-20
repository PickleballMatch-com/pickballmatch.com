// Simple debug logging utility for server-side debugging
export function debugLog(component: string, message: string, data?: any): void {
  console.log(`[DEBUG][${component}] ${message}`);
  if (data !== undefined) {
    try {
      console.log(JSON.stringify(data, getCircularReplacer(), 2));
    } catch (e) {
      console.log('Failed to stringify data:', e);
      console.log('Raw data:', data);
    }
  }
}

// Handle circular references in JSON.stringify
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    // Convert Date objects to ISO strings
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  };
}