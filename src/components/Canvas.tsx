import React from "react";
import { CanvasProps, DrawingOptions } from "./../interfaces";

interface CanvasCoordinates {
  x: number;
  y: number;
}

interface CanvasHistory {
  idCounter: number;
  objectList: CanvasObject[];
}

interface CanvasState {
  currentlyDrawing: boolean;
  initialPosition: CanvasCoordinates | null;
  endPosition: CanvasCoordinates | null;
  width: number;
  height: number;
  canvasHistory: CanvasHistory;
}

class CanvasObject {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  drawSelf(canv: CanvasRenderingContext2D): void {}

  drawRectangle(p1: CanvasCoordinates, p2: CanvasCoordinates, color: string, canv: CanvasRenderingContext2D) {
    let width: number = Math.abs(p1.x - p2.x);
    let height: number = Math.abs(p1.y - p2.y);

    canv.fillStyle = color;
    canv.fillRect(p1.x, p1.y, width, height);
  }

  drawSquare(p: CanvasCoordinates, color: "blue" | "green", canv: CanvasRenderingContext2D): void {
    canv.fillStyle = color;
    canv.fillRect(p.x - 10, p.y - 10, 20, 20);
  }
}

class CanvasBore extends CanvasObject {
  startPosition: CanvasCoordinates;
  endPosition: CanvasCoordinates;

  constructor(startPosition: CanvasCoordinates, endPosition: CanvasCoordinates, id: number) {
    super(id);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  drawSelf(canv: CanvasRenderingContext2D): void {
    super.drawSelf(canv);

    canv.beginPath();
    canv.moveTo(this.startPosition.x, this.startPosition.y);
    canv.lineTo(this.endPosition.x, this.endPosition.y);
    canv.lineWidth = 9;
    canv.setLineDash([25, 10, 25, 15]);
    canv.strokeStyle = "yellow";
    canv.stroke();

    this.drawSquare(this.startPosition, "green", canv);
    this.drawSquare(this.endPosition, "green", canv);
  }
}

class CanvasStationText extends CanvasObject {
  stationText: string;
  footage: string;
  date: string;
  startEnd: "START" | "END";
  position: CanvasCoordinates;

  constructor(
    stationText: string,
    footage: string,
    date: string,
    startEnd: "START" | "END",
    position: CanvasCoordinates,
    id: number
  ) {
    super(id);
    this.stationText = stationText;
    this.footage = footage;
    this.date = date;
    this.startEnd = startEnd;
    this.position = position;
  }

  drawSelf(canv: CanvasRenderingContext2D): void {
    super.drawSelf(canv);

    this.drawRectangle(
      { x: this.position.x - 3, y: this.position.y - 18 },
      { x: this.position.x + 122, y: this.position.y + 45 },
      "red",
      canv
    );

    canv.font = "20px Arial";
    canv.fillStyle = "black";
    canv.fillText(`STA#${this.stationText}`, this.position.x, this.position.y);
    canv.fillText(`${this.footage}' ${this.startEnd}`, this.position.x, this.position.y + 20);
    canv.fillText(this.date, this.position.x, this.position.y + 40);
  }
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
      canvasHistory: { idCounter: 0, objectList: [] },
    };

    this.userClick = this.userClick.bind(this);
  }

  drawAllObjects() {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    for (const obj of this.state.canvasHistory.objectList) {
      obj.drawSelf(canv);
    }
  }

  clearCanvasHistory() {
    let currentCanvasHistory: CanvasHistory = this.state.canvasHistory;
    currentCanvasHistory.objectList = [];
    this.setState({
      canvasHistory: currentCanvasHistory,
    });
  }

  clearCanvas() {
    let canvasElement: HTMLCanvasElement = document.getElementById("canv") as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    canv.clearRect(0, 0, this.state.width, this.state.width);
  }

  appendObjectToObjectList(obj: CanvasObject): void {
    let currentCanvasHistory: CanvasHistory = this.state.canvasHistory;
    currentCanvasHistory.objectList.push(obj);
    this.setState({
      canvasHistory: currentCanvasHistory,
    });
  }

  createStationText(clickPosition: CanvasCoordinates) {
    let stationNumberInput = document.getElementById("stationNumberInput") as HTMLInputElement;
    let stationNumberText: string = stationNumberInput.value;

    let footageInput = document.getElementById("footageInput") as HTMLInputElement;
    let footageText: string = footageInput.value;

    let dateInput = document.getElementById("dateInput") as HTMLInputElement;
    let dateText: string = dateInput.value;

    let startEndInput = document.getElementById("startEndSelect") as HTMLSelectElement;
    let startEndOption = startEndInput.value as "START" | "END";

    let stationText: CanvasObject = new CanvasStationText(
      stationNumberText,
      footageText,
      dateText,
      startEndOption,
      clickPosition,
      this.getNextId()
    );
    this.appendObjectToObjectList(stationText);
  }

  createBoreLine(p1: CanvasCoordinates, p2: CanvasCoordinates): void {
    let boreLine: CanvasObject = new CanvasBore(p1, p2, this.getNextId());
    this.appendObjectToObjectList(boreLine);
  }

  getNextId(): number {
    let currentCanvasHistory: CanvasHistory = this.state.canvasHistory;
    let returnId: number = currentCanvasHistory.idCounter;
    currentCanvasHistory.idCounter++;
    this.setState({
      canvasHistory: currentCanvasHistory,
    });
    return returnId;
  }

  deleteLastObject() {
    let currentCanvasHistory: CanvasHistory = this.state.canvasHistory;
    currentCanvasHistory.objectList.pop();
    this.setState(
      {
        canvasHistory: currentCanvasHistory,
      },
      () => {
        this.clearCanvas();
        this.drawAllObjects();
      }
    );
  }

  userClick(e: React.MouseEvent<HTMLElement>) {
    console.log("user click");
    console.log(this.props.currentlySelectedOption);
    console.log("current state..");
    console.log(this.state);

    let clickPosition: CanvasCoordinates = {
      x: e.clientX,
      y: e.clientY,
    };

    if (this.props.currentlySelectedOption === DrawingOptions.none) {
      return;
    }
    if (this.props.currentlySelectedOption === DrawingOptions.staText) {
      this.createStationText(clickPosition);
      this.drawAllObjects();
      return;
    }

    if (this.state.currentlyDrawing) {
      console.log("this happens...");
      // this.drawLine(this.state.initialPosition as CanvasCoordinates, clickPosition);
      this.createBoreLine(this.state.initialPosition as CanvasCoordinates, clickPosition);
      this.drawAllObjects();
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
