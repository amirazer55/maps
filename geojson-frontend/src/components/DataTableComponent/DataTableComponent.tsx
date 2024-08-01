import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import { DataTableComponentProps } from "../../interfaces/dataTable.interface";
import { Location } from "../../interfaces/location.interface";
import "primeicons/primeicons.css";

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  locations,
  onListItemClick,
}) => {
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

  const renderHeader = () => {
    return (
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
  };

  const nameBodyTemplate = (rowData: Location) => {
    return <span>{rowData.properties.name}</span>;
  };

  const scoreBodyTemplate = (rowData: Location) => {
    return <span>{rowData.properties.score}</span>;
  };

  const addressBodyTemplate = (rowData: Location) => {
    return <span>{rowData.properties.address}</span>;
  };

  const header = renderHeader();

  const onSort = (e: any) => {
    const { sortField, sortOrder } = e;
    setSort({ field: sortField, order: sortOrder });
  };

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>
      <DataTable
        value={locations}
        paginator
        rows={rows}
        first={first}
        onPage={onPageChange}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 20, 30]}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        onRowClick={(e) => onListItemClick(e.data as Location)}
        sortField={sort.field}
        sortOrder={sort.order}
        onSort={onSort}
        filters={filters}
        header={header}
        globalFilterFields={[
          "properties.name",
          "properties.address",
          "properties.score",
        ]}
      >
        <Column field="properties.id" header="Id" sortable />
        <Column
          field="properties.name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
          body={nameBodyTemplate}
        />
        <Column
          field="properties.address"
          header="Address"
          sortable
          filter
          filterPlaceholder="Search by adress"
          body={addressBodyTemplate}
        />
        <Column
          field="properties.score"
          header="Score"
          sortable
          filter
          filterPlaceholder="Search by Score"
          body={scoreBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
