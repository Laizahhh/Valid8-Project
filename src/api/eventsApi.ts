const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: string;
}

export const fetchUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/events/upcoming`);
    
    if (!response.ok) throw new Error('Network error');
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    throw error;
  }
};

export const fetchEventsAttended = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/events/attended`);
    
    if (!response.ok) throw new Error('Network error');
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching attended events:", error);
    throw error;
  }
};