import React from "react";

interface SortComponentProps {
  setSort: (sort: { field: string; order: "asc" | "desc" }) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ setSort }) => {
  const [nameSortOrder, setNameSortOrder] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [scoreSortOrder, setScoreSortOrder] = React.useState<"asc" | "desc">(
    "asc"
  );

  const toggleSortOrder = (field: string) => {
    if (field === "name") {
      const newOrder = nameSortOrder === "asc" ? "desc" : "asc";
      setNameSortOrder(newOrder);
      setSort({ field, order: newOrder });
    } else if (field === "score") {
      const newOrder = scoreSortOrder === "asc" ? "desc" : "asc";
      setScoreSortOrder(newOrder);
      setSort({ field, order: newOrder });
    }
  };

  return (
    <div className="sort-component">
      <div>
        <label>Sort By: </label>
        <button onClick={() => toggleSortOrder("name")}>
          Name
          {nameSortOrder === "asc" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="sort-icon"
            >
              <path
                fillRule="evenodd"
                d="M6 10a1 1 0 01.117 1.993L6 12H2a1 1 0 01-.117-1.993L2 10h4zm4-4a1 1 0 01.117 1.993L10 8H2a1 1 0 01-.117-1.993L2 6h8zm4-4a1 1 0 01.117 1.993L14 4H2a1 1 0 01-.117-1.993L2 2h12zm-8 8a1 1 0 01.117 1.993L6 12H2a1 1 0 01-.117-1.993L2 10h4zm4-4a1 1 0 01.117 1.993L10 8H2a1 1 0 01-.117-1.993L2 6h8zm4-4a1 1 0 01.117 1.993L14 4H2a1 1 0 01-.117-1.993L2 2h12z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="sort-icon"
            >
              <path
                fillRule="evenodd"
                d="M14 10a1 1 0 00-.117-1.993L14 8h-4a1 1 0 00-.117 1.993L10 10h4zm-4 4a1 1 0 00-.117-1.993L10 12h-4a1 1 0 00-.117 1.993L6 14h4zm-4-8a1 1 0 00-.117-1.993L6 4H2a1 1 0 00-.117 1.993L2 6h4zm8 0a1 1 0 00-.117-1.993L14 4h-4a1 1 0 00-.117 1.993L10 6h4zm-4 4a1 1 0 00-.117-1.993L10 8H2a1 1 0 00-.117 1.993L2 10h8z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <button onClick={() => toggleSortOrder("score")}>
          Score
          {scoreSortOrder === "asc" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="sort-icon"
            >
              <path
                fillRule="evenodd"
                d="M6 10a1 1 0 01.117 1.993L6 12H2a1 1 0 01-.117-1.993L2 10h4zm4-4a1 1 0 01.117 1.993L10 8H2a1 1 0 01-.117-1.993L2 6h8zm4-4a1 1 0 01.117 1.993L14 4H2a1 1 0 01-.117-1.993L2 2h12zm-8 8a1 1 0 01.117 1.993L6 12H2a1 1 0 01-.117-1.993L2 10h4zm4-4a1 1 0 01.117 1.993L10 8H2a1 1 0 01-.117-1.993L2 6h8zm4-4a1 1 0 01.117 1.993L14 4H2a1 1 0 01-.117-1.993L2 2h12z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="sort-icon"
            >
              <path
                fillRule="evenodd"
                d="M14 10a1 1 0 00-.117-1.993L14 8h-4a1 1 0 00-.117 1.993L10 10h4zm-4 4a1 1 0 00-.117-1.993L10 12h-4a1 1 0 00-.117 1.993L6 14h4zm-4-8a1 1 0 00-.117-1.993L6 4H2a1 1 0 00-.117 1.993L2 6h4zm8 0a1 1 0 00-.117-1.993L14 4h-4a1 1 0 00-.117 1.993L10 6h4zm-4 4a1 1 0 00-.117-1.993L10 8H2a1 1 0 00-.117 1.993L2 10h8z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SortComponent;
