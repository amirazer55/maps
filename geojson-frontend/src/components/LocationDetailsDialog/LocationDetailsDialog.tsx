import React from "react";
import { Dialog } from "primereact/dialog";

import { LocationDetailsDialogProps } from "../../interfaces/locationDetails.interface";

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
          <h3>ID: {popupInfo.properties.id}</h3>
          <p>Score: {popupInfo.properties.name}</p>
          <p>Address: {popupInfo.properties.address}</p>
          <p>Country: {popupInfo.properties.score}</p>
        </div>
      )}
    </Dialog>
  );
};

export default LocationDetailsDialog;
