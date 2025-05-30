import { useEffect, useState } from "react";
import locationService from "../services/locationService";
import { Location } from "../types/api";

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = async () => {
    try {
      const response = await locationService.getLocations();
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
