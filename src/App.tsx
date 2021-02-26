import React from 'react';
import './App.css';
import Drawer from './components/Drawer';

interface TestProps {
  test: boolean,
};

function App() {
  const testProps: TestProps = {
    test: false,
  }

  return (
    <div className="App">
      <Drawer
        {...testProps}
      />
    </div>
  );
}

export default App;
