// lib/api-config.ts

// Check if we are running on the server or in the browser
// and if we are in development mode (localhost) or production
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// In development, talk to your local Flask server
// In production, talk to your Vercel project's own API routes
const BASE_URL = IS_PRODUCTION 
  ? '' // Vercel handles relative paths automatically
  : 'http://127.0.0.1:5000';

export const API_ENDPOINTS = {
  leaderboard: `${BASE_URL}/api/leaderboard`,
  events: `${BASE_URL}/api/events`,
};