import { useEffect, useState } from "react";
import { LocationAPI } from "../APIs/LocationAPI";

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
      const response = await LocationAPI.getLocations();
      setLocations(response);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return locations;
};
