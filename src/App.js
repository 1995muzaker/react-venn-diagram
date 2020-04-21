import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";
import * as venn from "venn.js";

var sets = [
  {
    size: 3411,
    sets: ["Radiohead", "Thom Yorke", "John Lennon"],
  },
  {
    size: 5039,
    sets: ["Radiohead", "Thom Yorke"],
  },
  {
    size: 4829,
    sets: ["Radiohead", "John Lennon"],
  },
  {
    size: 14861,
    sets: ["Thom Yorke", "John Lennon"],
  },
  {
    size: 21792,
    sets: ["Radiohead"],
  },
  {
    size: 35261,
    sets: ["Thom Yorke"],
  },
  {
    size: 37272,
    sets: ["John Lennon"],
  },
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
      .on("mouseover", function (d, i) {
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
        tooltip.text(`${d.size} ${d.sets} Users `);

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection
          .select("path")
          .style("stroke-width", 3)
          .style("fill-opacity", d.sets.length === 1 ? 0.4 : 0.1)
          .style("stroke-opacity", 1);
      })

      .on("mousemove", function () {
        //console.log(d3.event)
        console.log(tooltip);
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })

      .on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", d.sets.length === 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      });
  }
  render() {
    return (
      <div className="venn-div">
        <h2>Venn Diagram in React.js</h2>
        <div className="" ref="chart"></div>
      </div>
    );
  }
}

export default App;
