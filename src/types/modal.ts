export type ModalProps = {
  /**
   * The content of the modal.
   */
  children: React.ReactNode;
  /**
   * If `true`, the modal is open.
   * @default false
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be closed.
   * The `onClose` function should be used to set the `open` prop to false.
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: "backdropClick", "escapeKeyDown".
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, reason: string) => void;
};
