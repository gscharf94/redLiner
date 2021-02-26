import React from 'react';
import examplePicture from './../example_picture.png';

export default class Background extends React.Component {
  constructor(props: any) {
    super(props);
    this.setState({
      test: props.test,
    });
  }

  render() {
    return <img style={{width: "100%", height: "auto", position: "absolute", top: 0, left: 0, zIndex: -10}} src={examplePicture} alt="test"/>
  }
}