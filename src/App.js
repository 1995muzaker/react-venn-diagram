import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";
import * as venn from "venn.js";

var sets = [
  {
    size: 3411,
    sets: ["91", "101", "111"]
  },
  {
    size: 5039,
    sets: ["91", "101"]
  },
  {
    size: 4829,
    sets: ["91", "111"]
  },
  {
    size: 14861,
    sets: ["101", "111"]
  },
  {
    size: 21792,
    sets: ["91"]
  },
  {
    size: 35261,
    sets: ["101"]
  },
  {
    size: 37272,
    sets: ["111"]
  }
];

class App extends Component {
  chart = venn.VennDiagram();
  componentDidMount() {
    let div = d3.select(this.refs.chart);
    div.datum(sets).call(this.chart);
  }
  render() {
    return (
      <div className="" ref="chart">
      </div>
    );
  }
}

export default App;
