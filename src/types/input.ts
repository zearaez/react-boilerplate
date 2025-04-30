import { TextFieldType } from '@/enums/enum';
import { SelectChangeEvent } from '@mui/material';

type Option = {
  label: string;
  value: string | number;
};

export type SelectCustomProps = {
  options: Option[];
  isBackground?: boolean;
  isBorder?: boolean;
};

export type SelectComponentProps = {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: Option[];
  id?: string;
  labelId?: string;
  isBackground?: boolean;
  name: string;
  displayEmpty?: boolean;
  isBorder?: boolean;
};

export interface TextFieldComponentProps {
  label?: string;
  value: string;
  type?: TextFieldType;
  placeholder?: string;
  showClearIcon?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  hasError: boolean;
  errorMessage?: string;
  variant?: 'white' | 'black';
}
