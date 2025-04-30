import {
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

export type TableColumn = {
  field: string;
  headerName: string;
  width?: number;
  type?: string;
  editable?: boolean;
};
export interface TableAction {
  label: string;
  handler: (row: GridValidRowModel) => void;
}

export type TableProps = {
  columns: GridColDef<GridValidRowModel[number]>[];
  rows: GridValidRowModel[];
  pageSize?: number;
  loading: boolean;
  actions?: TableAction[];
  hideFooter?: boolean;
  contentAlign?: 'left' | 'center' | 'right';
  onSortChange?: (model: GridSortModel) => void;
  onFilterChange?: (model: GridFilterModel) => void;
  onPaginationChange?: (model: GridPaginationModel) => void;
};
