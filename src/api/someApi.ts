import axiosInstance from "./axiosInstance";

export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
