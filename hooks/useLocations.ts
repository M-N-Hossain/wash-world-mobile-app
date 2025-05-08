import { useEffect, useState } from "react";
import { LocationAPI } from "../APIs/LocationAPI";

export const useLocations = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await LocationAPI.getLocations();
      setLocations(response);
      //   console.log("Locations fetched:", response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return locations;
};
