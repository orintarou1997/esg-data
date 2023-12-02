import React, { Component } from 'react';
import * as d3 from 'd3';

var data = []
//data hierarchy
class AlterTable extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	}

	componentDidMount(){
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
		  const root = pack(d3.hierarchy(this.props.data)
		      .sum(d => d.value));

		  this.setState({
		  	data: root.descendants().slice(1)
		  })

	}

	render(){
		 return (
		    <div className='fixed right-[0%] top-[20%] w-2/4 pl-[10%] text-black'>
		    	{
		    		this.state.data.map((item) => {
		    					return (
		    							<ul className="hover:bg-zinc-300">{item.data.name}
		    							</ul>
		    						)
		    			
		    		})
		    	}
		    </div>
		  );
	}
}

export default AlterTable;