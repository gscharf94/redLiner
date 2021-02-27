export enum DrawingOptions {
  none,
  bore,
  staText,
  handHole,
  note,
  clear,
  stationArrow,
}

export interface DrawerProps {
  canvasWidth: number;
  canvasHeight: number;
}

export interface CanvasProps {
  currentlySelectedOption: DrawingOptions;
  clearSelectionInParent: () => void;
  width: number;
  height: number;
}

export interface SelectionBarProps {
  drawingOptionSelection: (option: DrawingOptions) => void;
}

export interface SelectionButtonProps {
  selectionType: DrawingOptions;
  selectionCallback: (option: DrawingOptions) => void;
}

export interface StationTextInputProps {
  test: boolean;
}
