import axiosInstance from "./axiosInstance";

export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.get(`/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData: object) => {
  try {
    const response = await axiosInstance.post(`/events`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
