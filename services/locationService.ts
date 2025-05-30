import { LOCATION_URL } from "../constants/api";
import { Location } from "../types/api";
import axiosInstance from "../utils/axiosInterceptor";

class LocationService {
  async getLocations(): Promise<Location[]> {
    try {
      const response = await axiosInstance.get(LOCATION_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }
}

export default new LocationService(); 