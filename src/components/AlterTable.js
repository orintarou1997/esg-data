import React, { Component } from 'react';
import * as d3 from 'd3';

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
		    <div className='alter-table'>
		    	{
		    		this.state.data.map((item) => {
		    			if(item.children){
		    				var myLabel = item.data.name;
		    				var myLabelScore = 0;
		    				return(
		    					<ul className={'list-header'}>{myLabel}
								{	
									item.children.map((child) => {
										myLabelScore+=1;
										myLabel = (myLabelScore === 1) ? item.data.name : "";
			    						return (
			    									<li className="list-item">{child.data.name}</li>
			    						)
			    					})
								}
		    					</ul>
		    				)
		    			}else{
		    				if(item.parent.data.name === 'Eve'){
		    					return (
		    							<ul className="list-header">{item.data.name}
		    							</ul>
		    						)
		    				}
		    			}
		    		})
		    	}
		    </div>
		  );
	}
}

export default AlterTable;

{/*
			    					<li>{item.data.name}
			    					<ul>
			    					<li>{child.name}</li>
			    					</ul>
			    					</li>*/}

{/*			    	<li>InnerOne</li>
			    	<li>InnerTwo
			    		<ul>
			    		<li>Innto</li>
			    		<li>Intooo</li>
			    		</ul>
			    	</li>

			    	<li>InnerThree</li>

*/}

// .list-item{
//   background-color: gray;
//   border: 2px solid black;
//   list-style-type: none;
//   margin-left: 100px;
// }
