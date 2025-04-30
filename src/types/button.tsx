import { ButtonSize, ButtonType, ButtonVariant } from '@/enums/enum';

export type RoundedButtonProps = {
  onClick?: () => void;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type: ButtonType;
  disabled?: boolean;
};
