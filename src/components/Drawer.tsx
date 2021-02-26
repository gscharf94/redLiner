import React from 'react';
import Background from './Background';
import Canvas from './Canvas';

interface TestProps {
  test: boolean,
};

export default class Drawer extends React.Component {
  constructor(props: TestProps) {
    super(props);
    this.setState({
      test: props.test,
    });
  }

  render() {

    const canvasProps: TestProps = {
      test: true,
    }

    return <div>
      <h1>Test</h1>
      <Canvas {...canvasProps} />
      <Background/>
      </div>
  }
}