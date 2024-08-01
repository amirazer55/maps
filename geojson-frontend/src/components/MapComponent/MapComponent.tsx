import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import { useMap } from "../../hooks/useMap";
import { MapComponentProps } from "../../interfaces/map.interface";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const { loading } = useMap(locations);

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <ProgressSpinner />
        </div>
      )}
      <div id="map" style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default MapComponent;
