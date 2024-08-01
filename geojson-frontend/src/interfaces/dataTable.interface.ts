import { Location } from "./location.interface";

export interface DataTableComponentProps {
  locations: Location[];
  onListItemClick: (location: Location) => void;
}
