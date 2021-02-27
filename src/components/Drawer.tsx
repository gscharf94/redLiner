import React from "react";
import Background from "./Background";
import Canvas from "./Canvas";
import SelectionBar from "./SelectionBar";
import StationTextInput from "./StationTextInput";
import { DrawerProps, CanvasProps, SelectionBarProps, DrawingOptions } from "./../interfaces";

export interface DrawerState {
  canvasWidth: number;
  canvasHeight: number;
  currentlySelectedOption: DrawingOptions;
  showStationTextInput: boolean;
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      canvasWidth: props.canvasWidth,
      canvasHeight: props.canvasHeight,
      currentlySelectedOption: DrawingOptions.none,
      showStationTextInput: false,
    };

    this.drawingOptionSelected = this.drawingOptionSelected.bind(this);
    this.clearOption = this.clearOption.bind(this);
  }

  clearOption() {
    this.setState({
      currentlySelectedOption: DrawingOptions.none,
    });
  }

  toggleStationTextInput() {
    if (this.state.showStationTextInput) {
      this.setState({
        showStationTextInput: false,
      });
    } else {
      this.setState({
        showStationTextInput: true,
      });
    }
  }

  drawingOptionSelected(option: DrawingOptions) {
    console.log(`clicked selection bar.. ${option} | ${DrawingOptions[option]}`);
    if (option === DrawingOptions.clear) {
      (this.refs.canvas as any).clearCanvas();
    } else if (option === DrawingOptions.staText) {
      this.toggleStationTextInput();
    }
    this.setState({
      currentlySelectedOption: option,
    });
  }

  render() {
    const canvasProps: CanvasProps = {
      currentlySelectedOption: this.state.currentlySelectedOption,
      clearSelectionInParent: this.clearOption,
      width: this.state.canvasWidth,
      height: this.state.canvasHeight,
    };

    const selectionBarProps: SelectionBarProps = {
      drawingOptionSelection: this.drawingOptionSelected,
    };

    return (
      <div>
        <Canvas ref="canvas" {...canvasProps} />
        <SelectionBar {...selectionBarProps} />
        {this.state.showStationTextInput && <StationTextInput />}
        <Background />
      </div>
    );
  }
}
