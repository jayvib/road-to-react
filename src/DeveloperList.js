import React, { Component } from "react";
import Developer from "./Developer";

class DeveloperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devs: props.devs,
    }
  }
  render() {
    return (
      <>
        <h1>Developers</h1>
        <ul className="developers">
          {this.state.devs.map(dev => (
            <Developer name={dev}/>
          ))}
        </ul>
      </>
    )
  }
}

export default DeveloperList;
