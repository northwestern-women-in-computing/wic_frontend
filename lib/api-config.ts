/**
 * API Configuration
 * 
 * In development, uses localhost:5000
 * In production, uses NEXT_PUBLIC_API_URL environment variable
 * 
 * Set NEXT_PUBLIC_API_URL in Vercel environment variables
 * to your deployed backend URL (e.g., https://your-backend.vercel.app)
 */
// Determine API base URL
// Priority: 1. NEXT_PUBLIC_API_URL env var, 2. localhost for local dev, 3. empty (will fail)
export const API_BASE_URL = (() => {
  // Check for explicit environment variable first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback to localhost only if running locally
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  
  // In production without env var, this will cause errors (which is expected)
  // User must set NEXT_PUBLIC_API_URL in Vercel
  return '';
})();

export const API_ENDPOINTS = {
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  events: `${API_BASE_URL}/api/events`,
} as const;

