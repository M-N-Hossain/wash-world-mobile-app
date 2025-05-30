import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const API_URL = Constants.expoConfig?.extra?.API_URL;

type Location = {
  uid: string;
  locations_ud: string;
  name: string;
  address: string;
  coordinates: {
    x: string;
    y: string;
  };
  open_hours: string;
  message: string;
  halls_count: number;
};

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/locations`);
      setLocations(response.data);
    } catch (error) {
      // Handle error silently
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return locations;
};
