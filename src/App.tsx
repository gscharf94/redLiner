import React from "react";
import "./App.css";
import Drawer from "./components/Drawer";
import { DrawerProps } from "./interfaces";

function App() {
  const DrawerProps: DrawerProps = {
    canvasWidth: 1900,
    canvasHeight: 800,
  };

  return (
    <div className="App">
      <Drawer {...DrawerProps} />
    </div>
  );
}

export default App;
