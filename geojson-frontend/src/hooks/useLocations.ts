import { useState, useEffect } from "react";
import { fetchLocations } from "../api/fetchLocations";
import { Location } from "../interfaces/location.interface";

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations()
      .then((data) => {
        setLocations(data.allFeatures);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return {
    locations,
  };
};
