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

    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "venntooltip")
      .style("display", "none");

    div
      .selectAll("g")
      .on("mouseover", function(d, i) {
        //console.log(this)

        // sort all the areas relative to the current item

        //console.log(d)

        venn.sortAreas(div, d);
        // Display a tooltip with the current size
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 1)
          .style("display", "inline");
        tooltip.text(`${d.size}  users`);

        // highlight the current path
        var selection = d3
          .select(this)
          .transition("tooltip")
          .duration(400);
        selection
          .select("path")
          .style("stroke-width", 3)
          .style("fill-opacity", d.sets.length === 1 ? 0.4 : 0.1)
          .style("stroke-opacity", 1);
      })

      .on("mousemove", function() {
        //console.log(d3.event)
        console.log(tooltip);
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })

      .on("mouseout", function(d, i) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
        var selection = d3
          .select(this)
          .transition("tooltip")
          .duration(400);
        selection
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", d.sets.length === 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      });
  }
  render() {
    return <div className="" ref="chart"></div>;
  }
}

export default App;
