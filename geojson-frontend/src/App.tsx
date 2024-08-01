import React from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import DataTableComponent from "./components/DataTableComponent/DataTableComponent";
import LocationDetailsDialog from "./components/LocationDetailsDialog/LocationDetailsDialog";
import SearchAndFilter from "./components/SearchAndFilter/SearchAndFilter";
import { useAppLogic } from "./hooks/useAppLogic";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const App: React.FC = () => {
  const {
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
  } = useAppLogic();
    console.log("🚀 ~ total:", total)
    console.log("🚀 ~ rowsPerPage:", rowsPerPage)
    console.log("🚀 ~ currentPage:", currentPage)

  return (
    <div className="App">
      <MapComponent />
      <div className="content">
        <SearchAndFilter
          search={search}
          onSearchChange={handleSearch}
          setFilters={setFilters}
        />
        <DataTableComponent
          locations={filteredLocations}
          first={(currentPage - 1) * rowsPerPage}
          rows={rowsPerPage}
          total={total}
          onPageChange={handlePageChange}
          onListItemClick={handleListItemClick}
          setSort={setSort}
          sort={sort}
        />
        <LocationDetailsDialog
          popupInfo={popupInfo}
          onHide={() => setPopupInfo(null)}
        />
      </div>
    </div>
  );
};

export default App;
