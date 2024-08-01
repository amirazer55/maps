import { useLocations } from "./useLocations";
import { useMap } from "./useMap";
import { Location } from "../interfaces/location.interface";

export const useAppLogic = () => {
  const {
    locations,
  } = useLocations();
  const { popupInfo, setPopupInfo, setSelectedLocation } =
    useMap(locations);


  const handleListItemClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return {
    locations,
    handleListItemClick,
    popupInfo,
    setPopupInfo,
  };
};
