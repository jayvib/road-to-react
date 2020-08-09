import React, { Component } from "react";

class Developer extends Component {
  render() {
    return (
      <li>Hello I'm {this.props.name}</li>
    )
  }
}

export default Developer;
