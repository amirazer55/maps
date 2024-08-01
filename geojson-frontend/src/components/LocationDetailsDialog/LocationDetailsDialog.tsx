import React from "react";
import { Dialog } from "primereact/dialog";
import { Location } from "../../hooks/useLocations";

interface LocationDetailsDialogProps {
  popupInfo: Location | null;
  onHide: () => void;
}

const LocationDetailsDialog: React.FC<LocationDetailsDialogProps> = ({
  popupInfo,
  onHide,
}) => {
  return (
    <Dialog
      header="Location Details"
      visible={!!popupInfo}
      style={{ width: "50vw" }}
      modal
      onHide={onHide}
    >
      {popupInfo && (
        <div>
          <h3>{popupInfo.properties.name}</h3>
          <p>Score: {popupInfo.properties.score}</p>
          <p>Address: {popupInfo.properties.address}</p>
          <p>Country: {popupInfo.properties.country}</p>
          <p>State: {popupInfo.properties.state}</p>
          <p>Site Type: {popupInfo.properties.siteType}</p>
          <p>Score: {popupInfo.properties.priorityScore}</p>
        </div>
      )}
    </Dialog>
  );
};

export default LocationDetailsDialog;
