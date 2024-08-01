import { useState, useEffect } from "react";
import { fetchLocations } from "../services/fetchLocations";

export interface Location {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string; 
    score: number;
    address: string;
    country?: string;
    state?: string;
    siteType?: string;
    priorityScore?: number;
  };
}

export const useLocations = (initialPage = 1, initialLimit = 10) => {
  const [locations, setLocations] = useState<Location[]>([]);
  console.log("🚀 ~ useLocations ~ locations:", locations)
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialLimit);
  const [filters, setFilters] = useState<{
    scoreRange?: [number, number];
    category?: string;
  }>({});
  const [sort, setSort] = useState<{ field: string; order: "asc" | "desc" }>({
    field: "name",
    order: "asc",
  });

  useEffect(() => {
    fetchLocations(currentPage, rowsPerPage)
      .then((data) => {
        setLocations(data.features);
        setTotal(data.total);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    let updatedLocations = [...locations];

    if (filters.scoreRange) {
      updatedLocations = updatedLocations.filter(
        (location) =>
          location.properties.score >= filters.scoreRange![0] &&
          location.properties.score <= filters.scoreRange![1]
      );
    }

    if (filters.category) {
      updatedLocations = updatedLocations.filter(
        (location) => location.properties.name === filters.category
      );
    }

    updatedLocations.sort((a, b) => {
      if (sort.field === "name") {
        return sort.order === "asc"
          ? a.properties.name.localeCompare(b.properties.name)
          : b.properties.name.localeCompare(a.properties.name);
      } else if (sort.field === "score") {
        return sort.order === "asc"
          ? a.properties.score - b.properties.score
          : b.properties.score - a.properties.score;
      }
      return 0;
    });

    setFilteredLocations(updatedLocations);
  }, [locations, filters, sort]);

  const handlePageChange = (event: { first: number; rows: number }) => {
    console.log('1')
    const page = Math.floor(event.first / event.rows) + 1;
    setCurrentPage(page);
    setRowsPerPage(event.rows);
  };

  return {
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
  };
};
