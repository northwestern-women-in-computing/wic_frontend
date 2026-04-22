// lib/api-config.ts
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Explicitly point to your backend project URL
const PROD_URL = 'https://wic-backend.vercel.app';
const DEV_URL = 'http://127.0.0.1:5000';

const BASE_URL = IS_PRODUCTION ? PROD_URL : DEV_URL;

export const API_ENDPOINTS = {
  leaderboard: `${BASE_URL}/api/leaderboard`,
  events: `${BASE_URL}/api/events`,
};