import React from "react";
import SelectionButton from "./SelectionButton";
import { SelectionBarProps, DrawingOptions, SelectionButtonProps } from "./../interfaces";

interface SelectionBarState {
  currentlySelected: DrawingOptions;
}

export default class SelectionBar extends React.Component<SelectionBarProps, SelectionBarState> {
  constructor(props: SelectionBarProps) {
    super(props);
    this.state = {
      currentlySelected: DrawingOptions.none,
    };

    this.drawingOptionSelection = this.drawingOptionSelection.bind(this);
  }

  drawingOptionSelection(option: DrawingOptions) {
    this.props.drawingOptionSelection(option);
  }

  render() {
    const boreSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.bore,
      selectionCallback: this.drawingOptionSelection,
    };

    const clearSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.clear,
      selectionCallback: this.drawingOptionSelection,
    };

    const staTextSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.staText,
      selectionCallback: this.drawingOptionSelection,
    };

    const stationArrowSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.stationArrow,
      selectionCallback: this.drawingOptionSelection,
    };

    const undoSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.undo,
      selectionCallback: this.drawingOptionSelection,
    };

    const selectSelectionProps: SelectionButtonProps = {
      selectionType: DrawingOptions.select,
      selectionCallback: this.drawingOptionSelection,
    };

    return (
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue" }}>
        <SelectionButton {...selectSelectionProps} />
        <SelectionButton {...boreSelectionProps} />
        <SelectionButton {...staTextSelectionProps} />
        <SelectionButton {...stationArrowSelectionProps} />
        <SelectionButton {...clearSelectionProps} />
        <SelectionButton {...undoSelectionProps} />
      </div>
    );
  }
}
