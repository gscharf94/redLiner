import React from "react";
import { StationTextInputProps } from "./../interfaces";

export default class StationTextInput extends React.Component {
  constructor(props: StationTextInputProps) {
    super(props);

    this.state = {
      test: props.test,
    };
  }

  render() {
    return (
      <div>
        <label>STA#</label>
        <input id="stationNumberInput"></input>
        <label>Footage</label>
        <input id="footageInput"></input>
        <label>Date</label>
        <input id="dateInput"></input>
        <select id="startEndSelect">
          <option>START</option>
          <option>END</option>
        </select>
      </div>
    );
  }
}
