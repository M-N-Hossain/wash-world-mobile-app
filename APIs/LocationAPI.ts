import axiosInstance from "../utils/axiosInterceptor";

export class LocationAPI {
  static LOCATION_URL =
    "https://washworld.dk/wp-json/ww/v1/locations?country=da&cacheBuster=17461100";

  static async getLocations() {
    try {
      const response = await axiosInstance.get(LocationAPI.LOCATION_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }
}
