import React from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import DataTableComponent from "./components/DataTableComponent/DataTableComponent";
import LocationDetailsDialog from "./components/LocationDetailsDialog/LocationDetailsDialog";
import { useAppLogic } from "./hooks/useAppLogic";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const App: React.FC = () => {
  const {
    locations,
    handleListItemClick,
    popupInfo,
    setPopupInfo,
  } = useAppLogic();

  return (
    <div className="App">
      <MapComponent />
      <div className="content">
        <DataTableComponent
          locations={locations}
          onListItemClick={handleListItemClick}
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
