// src/api/eventsApi.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Fetch upcoming events function
export const fetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/events/upcoming`);
    return response.data;  // Assuming response is an array of upcoming events
  } catch (error) {
    throw error;
  }
};

// Fetch events attended function
export const fetchEventsAttended = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/events/attended`);
    return response.data;  // Assuming response is an array of attended events
  } catch (error) {
    throw error;
  }
};
