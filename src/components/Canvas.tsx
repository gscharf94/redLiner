import React from "react";
import { CanvasProps, DrawingOptions } from "./../interfaces";

interface CanvasCoordinates {
  x: number;
  y: number;
}

interface CanvasState {
  currentlyDrawing: boolean;
  initialPosition: CanvasCoordinates | null;
  endPosition: CanvasCoordinates | null;
  width: number;
  height: number;
}

export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor(props: CanvasProps) {
    super(props);
    this.state = {
      currentlyDrawing: false,
      initialPosition: null,
      endPosition: null,
      width: props.width,
      height: props.height,
    };

    this.userClick = this.userClick.bind(this);
  }

  drawLine(p1: CanvasCoordinates, p2: CanvasCoordinates) {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    canv.beginPath();
    canv.moveTo(p1.x, p1.y);
    canv.lineTo(p2.x, p2.y);
    canv.lineWidth = 9;
    canv.setLineDash([25, 10, 25, 15]);
    canv.strokeStyle = "yellow";
    canv.stroke();

    this.drawSquare(p1, "green");
    this.drawSquare(p2, "green");
  }

  drawSquare(p: CanvasCoordinates, color: "blue" | "green"): void {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    canv.fillStyle = color;
    canv.fillRect(p.x - 10, p.y - 10, 20, 20);
  }

  clearCanvas() {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    canv.clearRect(0, 0, this.state.width, this.state.width);
  }

  drawRectangle(p1: CanvasCoordinates, p2: CanvasCoordinates, color: string) {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    let width: number = Math.abs(p1.x - p2.x);
    let height: number = Math.abs(p1.y - p2.y);

    canv.fillStyle = color;
    canv.fillRect(p1.x, p1.y, width, height);
  }

  drawStationText(p: CanvasCoordinates) {
    this.drawRectangle({ x: p.x - 3, y: p.y - 18 }, { x: p.x + 122, y: p.y + 45 }, "red");

    let stationNumberInput = document.getElementById("stationNumberInput") as HTMLInputElement;
    let stationNumberText: string = stationNumberInput.value;

    let footageInput = document.getElementById("footageInput") as HTMLInputElement;
    let footageText: string = footageInput.value;

    let dateInput = document.getElementById("dateInput") as HTMLInputElement;
    let dateText: string = dateInput.value;

    let startEndInput = document.getElementById("startEndSelect") as HTMLSelectElement;
    let startEndOption = startEndInput.value;

    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    canv.font = "20px Arial";
    canv.fillStyle = "black";
    canv.fillText(`STA#${stationNumberText}`, p.x, p.y);
    canv.fillText(`${footageText}' ${startEndOption}`, p.x, p.y + 20);
    canv.fillText(dateText, p.x, p.y + 40);
  }

  userClick(e: React.MouseEvent<HTMLElement>) {
    console.log(this.props.currentlySelectedOption);

    let clickPosition: CanvasCoordinates = {
      x: e.clientX,
      y: e.clientY,
    };

    if (this.props.currentlySelectedOption === DrawingOptions.none) {
      return;
    }
    if (this.props.currentlySelectedOption === DrawingOptions.staText) {
      this.drawStationText(clickPosition);
      return;
    }
    if (this.state.currentlyDrawing) {
      this.drawLine(this.state.initialPosition as CanvasCoordinates, clickPosition);
      this.setState({
        endPosition: clickPosition,
        currentlyDrawing: false,
      });
    } else {
      this.setState({
        initialPosition: clickPosition,
        currentlyDrawing: true,
      });
    }
  }

  render() {
    return <canvas id="canv" width={this.state.width} height={this.state.height} onClick={this.userClick}></canvas>;
  }
}
