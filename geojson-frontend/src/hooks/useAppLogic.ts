import { useState } from "react";
import { useLocations, Location } from "./useLocations";
import { useMap } from "./useMap";

export const useAppLogic = () => {
  const {
    locations,
    filteredLocations,
    setFilteredLocations,
    total,
    currentPage,
    rowsPerPage,
    handlePageChange,
    setFilters,
    setSort,
    sort,
  } = useLocations();
  const [search, setSearch] = useState("");
  const { map, popupInfo, setPopupInfo, setSelectedLocation } =
    useMap(locations);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredLocations(
      locations.filter((location) =>
        location.properties.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleListItemClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return {
    search,
    handleSearch,
    filteredLocations,
    currentPage,
    rowsPerPage,
    total,
    handlePageChange,
    handleListItemClick,
    setFilters,
    setSort,
    sort,
    popupInfo,
    setPopupInfo,
  };
};
