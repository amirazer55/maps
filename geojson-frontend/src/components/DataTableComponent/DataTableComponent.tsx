import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Location } from "../../hooks/useLocations";

interface DataTableComponentProps {
  locations: Location[];
  first: number;
  rows: number;
  total: number;
  onPageChange: (event: { first: number; rows: number }) => void;
  onListItemClick: (location: Location) => void;
  setSort: (sort: { field: string; order: "asc" | "desc" }) => void;
  sort: { field: string; order: "asc" | "desc" };
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  locations,
  first,
  rows,
  total,
  onPageChange,
  onListItemClick,
  setSort,
  sort,
}) => {
  console.log("🚀 ~ locations:", locations)
  
  console.log("🚀 ~ total:", total)
  const onSort = (e: any) => {
    const field = e.sortField || sort.field;
    const order = e.sortOrder === 1 ? "asc" : "desc";

    const newOrder: "asc" | "desc" = sort.field === field ? order : "asc";
    setSort({ field, order: newOrder });
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
        totalRecords={total}
        sortField={sort.field}
        sortOrder={sort.order === "asc" ? 1 : -1}
        onSort={onSort}
        className="p-datatable-lg"
      >
        <Column field="properties.score" header="Priority Score" sortable />
        <Column field="properties.name" header="Site Name" sortable />
        <Column field="properties.id" header="State ID" sortable />
        <Column field="properties.address" header="Address" sortable />
        <Column field="properties.country" header="Country" sortable />
        <Column field="properties.siteType" header="Site Type" sortable />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
