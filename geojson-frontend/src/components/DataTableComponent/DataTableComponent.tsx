import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useDataService } from "./useDataService";
import { Header, GenericBodyTemplate } from "./renderingComponents";
import { DataTableComponentProps } from "../../interfaces/dataTable.interface";
import { Location } from "../../interfaces/location.interface";
import "primeicons/primeicons.css";

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  locations,
  onListItemClick,
}) => {
  const {
    first,
    rows,
    filters,
    sort,
    globalFilterValue,
    onGlobalFilterChange,
    onSort,
    onPageChange,
  } = useDataService();

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
        header={
          <Header
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        }
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
          body={(rowData) => (
            <GenericBodyTemplate rowData={rowData} field="name" />
          )}
        />
        <Column
          field="properties.address"
          header="Address"
          sortable
          filter
          filterPlaceholder="Search by address"
          body={(rowData) => (
            <GenericBodyTemplate rowData={rowData} field="address" />
          )}
        />
        <Column
          field="properties.score"
          header="Score"
          sortable
          filter
          filterPlaceholder="Search by Score"
          body={(rowData) => (
            <GenericBodyTemplate rowData={rowData} field="score" />
          )}
        />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
