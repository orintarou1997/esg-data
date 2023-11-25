import * as d3 from 'd3';
import { useEffect, useRef } from "react";


const chart = () => {
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

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 20px sans-serif;")
      .attr("text-anchor", "middle");

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1)) 
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")

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

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 1)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "inline"; });
  }



  var tooltip = d3.select("#bubble")
  .append('div')
  .style('opacity',0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

  var showTooltip = function(d){
    console.log("show");
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (d3.pointer(this)[0]+ 30) + "px")
      .style("top", (d3.pointer(this)[1] + 30) + "px")
  }

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  //svg.on("click", (event) => zoom(event, root))
  // Add a title.
  // node.append("title")
  //     .text(d => `${d.data.id}\n${format(d.value)}`);

  // Add a filled circle.
  // node.append("circle")
  //     .attr("fill-opacity", 0.7)
  //     //.attr("fill", d => color(group(d.data)))
  //     .attr("r", d => d.r)
  //     .on('mouseover', d => console.log(d.mass));


  // Add a label.
  // const text = node.append("text")
  //     .attr("clip-path", d => `circle(${d.r})`);

  // // Add a tspan for each CamelCase-separated word.
  // text.selectAll()
  //   .data(d => names(d.data))
  //   .join("tspan")
  //     .attr("x", 0)
  //     .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
  //     .text(d => d);

  // // Add a tspan for the node’s value.
  // text.append("tspan")
  //     .attr("x", 0)
  //     .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
  //     .attr("fill-opacity", 0.7)
  //     .text(d => format(d.value));

  return Object.assign(svg.node(), {scales: {color}});
}

const BubbleChart = () => {
  var frag = document.createDocumentFragment();
  var mydiv = document.createElement('div');
  mydiv.innerHTML = chart().outerHTML;

  while( mydiv.firstChild ) {
      frag.appendChild( mydiv.firstChild );
  }
  return frag;
};

const data = {
  name: "Eve",
  value:50,
  children: [
    {name: "Cain", value:10},
    {name: "", children: [{name: "Enos", value:10}, {name: "Noam", value:10}]},
    {name: "Abel", value:10},
    {name: "", children: [{name: "Enoch", value:10}, {name: "Aenoch", value:10}, {name: "Baenoch", value:10}]},
    {name: "Azura", value:10}
  ]
};
export default BubbleChart;