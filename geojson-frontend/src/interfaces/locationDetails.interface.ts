import { Location } from "./location.interface";

export interface LocationDetailsDialogProps {
    popupInfo: Location | null;
    onHide: () => void;
  }