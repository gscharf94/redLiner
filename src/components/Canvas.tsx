import React from 'react';

interface CanvasProps {
  test: boolean,
}

interface CanvasCoordinates {
  x: number,
  y: number,
}

interface CanvasState {
  currentlyDrawing: boolean,
  initialPosition: CanvasCoordinates | null,
  endPosition: CanvasCoordinates | null,
}

export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentlyDrawing: false,
      initialPosition: null,
      endPosition: null,
    }

    this.userClick = this.userClick.bind(this);
  }

  drawLine(p1: CanvasCoordinates, p2: CanvasCoordinates) {
    let canvasElement: HTMLCanvasElement = document.getElementById('canv') as HTMLCanvasElement;
    let canv: CanvasRenderingContext2D = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canv.beginPath();
    canv.moveTo(p1.x, p1.y);
    canv.lineTo(p2.x, p2.y);
    canv.lineWidth = 5;
    canv.stroke();
  }

  userClick(e: React.MouseEvent<HTMLElement>) {
    if (this.state.currentlyDrawing) {
      console.log('ending click');
      let endClickPosition: CanvasCoordinates = {
        x: e.clientX,
        y: e.clientY,
      }
      this.drawLine(this.state.initialPosition as CanvasCoordinates, endClickPosition);
      this.setState({
        endPosition: endClickPosition,
        currentlyDrawing: false,
      }, () => {
        console.log(this.state);
      });
    } else {
      console.log('initial click');
      let initialClickPosition: CanvasCoordinates = {
        x: e.clientX,
        y: e.clientY,
      }
      
      this.setState({
        initialPosition: initialClickPosition,
        currentlyDrawing: true,
      }, () => {
        console.log(this.state);
      });
    }
  }

  render() {
    return <canvas id="canv" width={1900} height={700}  onClick={this.userClick}></canvas>
  }
}