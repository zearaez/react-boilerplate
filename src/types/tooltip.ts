export type TooltipType = {
  icon: string | React.ReactNode;
  children: React.ReactNode;
  isContentClosable?: boolean;
  anchorEl?: HTMLElement | null;
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  sx?: React.CSSProperties;
};
