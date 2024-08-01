import { useState } from "react";

export const useSearchAndFilter = (
  setFilters: (filters: {
    scoreRange?: [number, number];
    category?: string;
  }) => void
) => {
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [category, setCategory] = useState<string>("");
  const handleFilterChange = () => {
    setFilters({ scoreRange, category });
  };
  return {
    scoreRange,
    setScoreRange,
    category,
    setCategory,
    handleFilterChange,
  };
};
