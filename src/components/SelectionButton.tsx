import React from "react";
import { DrawingOptions, SelectionButtonProps } from "./../interfaces";

interface SelectionButtonState {
  selectionType: DrawingOptions;
  active: boolean;
}

export default class SelectionButton extends React.Component<SelectionButtonProps, SelectionButtonState> {
  constructor(props: SelectionButtonProps) {
    super(props);

    this.state = {
      selectionType: props.selectionType,
      active: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e: React.MouseEvent<HTMLElement>) {
    this.props.selectionCallback(this.state.selectionType);
  }

  render() {
    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "lightgreen",
          border: "1px solid black",
          cursor: "pointer",
          margin: "3px",
        }}
        onClick={this.onClick}>
        {DrawingOptions[this.state.selectionType]}
      </div>
    );
  }
}
