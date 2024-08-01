import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useSearchAndFilter } from "../../hooks/useSearchAndFilter";

interface SearchAndFilterProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilters: (filters: {
    scoreRange?: [number, number];
    category?: string;
  }) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  search,
  onSearchChange,
  setFilters,
}) => {
  const {
    scoreRange,
    setScoreRange,
    category,
    setCategory,
    handleFilterChange,
  } = useSearchAndFilter(setFilters);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "1rem",
      }}
    >
      <div className="p-col-fixed" style={{ marginRight: "10px" }}>
        <span className="pi pi-search"></span>

        <InputText
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name"
          className="p-inputtext-md"
          style={{ borderRadius: "25px" }}
        />
      </div>
      <div className="p-col-fixed" style={{ marginRight: "10px" }}>
        <label
          style={{ fontWeight: "bold", color: "black", marginRight: "5px" }}
        >
          Score Range:
        </label>
        <InputNumber
          value={scoreRange[0]}
          onValueChange={(e) =>
            setScoreRange([e.value as number, scoreRange[1]])
          }
          mode="decimal"
          showButtons
          min={0}
          max={100}
          className="p-inputtext-md"
          style={{ borderRadius: "25px", marginRight: "5px" }}
        />
        -
        <InputNumber
          value={scoreRange[1]}
          onValueChange={(e) =>
            setScoreRange([scoreRange[0], e.value as number])
          }
          mode="decimal"
          showButtons
          min={0}
          max={100}
          className="p-inputtext-md"
          style={{ borderRadius: "25px", marginLeft: "5px" }}
        />
      </div>
      <div className="p-col-fixed" style={{ marginRight: "10px" }}>
        <label
          style={{ fontWeight: "bold", color: "black", marginRight: "5px" }}
        >
          Name:
        </label>
        <InputText
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-inputtext-md"
          placeholder="Filter By Name"
          style={{ borderRadius: "25px" }}
        />
      </div>
      <div className="p-col-fixed">
        <Button
          label="Apply Filters"
          onClick={handleFilterChange}
          className="p-button-md"
          style={{ borderRadius: "25px" }}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
