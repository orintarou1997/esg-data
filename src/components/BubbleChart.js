import React, { Component } from 'react';
import * as d3 from 'd3';

const chart = (data) => {
  // Specify the dimensions of the chart.
  const width = 528;
  const height = width;
  const margin = 1; // to avoid clipping the root circle stroke
 // const name = d => d.id.split(".").pop(); // "Strings" of "flare.util.Strings"
 // const group = d => d.id.split(".")[1]; // "util" of "flare.util.Strings"
 // const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

  // Specify the number format for values.
  const format = d3.format(",d");

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  // Create the pack layout.
  const pack = d3.pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(30);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  const root = pack(d3.hierarchy(data)
      .sum(d => d.value));

  var showTooltip = function(d){
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Name: " + d.target['__data__'].data.name)
      .style("left", (d.x) - 150 + "px")
      .style("top", (d.y) + 50 + "px")
  }

  var moveTooltip = function(d) {
    tooltip
      .style("left", (d.x) - 50 + "px")
      .style("top", (d.y) + 50 + "px")
  }

  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
  // Create the SVG container.
  const svg = d3.select("#bubble")
  	.append('svg')
      .attr("width", width)
      .attr("height", height/1.2)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height:auto;")
      .attr("text-anchor", "middle")

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1)) 
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "grey")
      .on('mouseover', showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
    
  // Append the text labels.
  const label = svg.append("g")
      .style("font", "10px sans-serif")
      .style('font-weight', "bold")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 1)
      .style("display", d => d.parent === root ? "inline" : "inline")
      .text(d => d.data.name)


  // // Create the zoom behavior and zoom immediately in to the initial focus node.
  //svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

   function zoomTo(v) {
     const k = width / v[2];

  //   view = v;

     label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
     node.attr("transform", d => `translate(${(d.x - v[0]) * k},${  (d.y - v[1]) * k})`);
     node.attr("r", d => (d.r * k));

   }


  var tooltip = d3.select("#bubble")
  .append('div')
  .style('opacity',0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")


  return [Object.assign(svg.node(), {scales: {color}}), root.descendants().slice(1)];
}

// const data = {
//   name: "Eve",
//   value:50,
//   children: [
//     {name: "Cain", value:10},
//     {name: "One", children: [{name: "Enos", value:10}, {name: "Noam", value:10}]},
//     {name: "Abel", value:10},
//     {name: "Two", children: [{name: "Enoch", value:10}, {name: "Aenoch", value:10}, {name: "Baenoch", value:10}]},
//     {name: "Azura", value:10}
//   ]
// };

class AppV1 extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
      version: this.props.version
		}
	}

	componentDidMount(){
		const data1 = chart(this.state.data)[1];
		this.setState({
			data: data1
		})
	}

	render(){
	const myNewData = this.state.data;
	  return (
	      <div id="bubble" className={this.state.version}>
	      </div>
	  );
	}
}

export default AppV1;