import { useState } from "react";
import { FilterMatchMode } from "primereact/api";

export const useDataService = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "properties.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "properties.address": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "properties.score": { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [sort, setSort] = useState<{ field: string; order: 1 | -1 }>({
    field: "properties.name",
    order: 1,
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters.global.value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onSort = (e: any) => {
    const { sortField, sortOrder } = e;
    setSort({ field: sortField, order: sortOrder });
  };

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return {
    first,
    rows,
    filters,
    sort,
    globalFilterValue,
    onGlobalFilterChange,
    onSort,
    onPageChange,
  };
};
