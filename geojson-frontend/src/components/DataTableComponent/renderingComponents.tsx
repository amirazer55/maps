import React from "react";
import { InputText } from "primereact/inputtext";
import { Location } from "../../interfaces/location.interface";
import { HeaderProps } from "../../interfaces/header.interface";

export const Header: React.FC<HeaderProps> = ({
  globalFilterValue,
  onGlobalFilterChange,
}) => (
  <div className="flex justify-content-end">
    <span className="p-input-icon-left">
      <span
        className="pi pi-search"
        style={{ color: "black", marginRight: "10px" }}
      ></span>
      <InputText
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    </span>
  </div>
);

export const GenericBodyTemplate: React.FC<{
  rowData: Location;
  field: keyof Location["properties"];
}> = ({ rowData, field }) => <span>{rowData.properties[field]}</span>;
