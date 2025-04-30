import { GridValidRowModel } from '@mui/x-data-grid';

export interface AddLocationFormProps {
  handleDialogClose: () => void;
  handleFormSubmit: () => void;
  locationData: GridValidRowModel;
  handleAddNewRoom: () => void;
}

export interface LocationData {
  locationName: string;
  locationType: string;
  noOfRooms: number;
  locationManager: string;
  staff: string;
}
