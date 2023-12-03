import React, { Component } from 'react';
import * as d3 from 'd3';

var data = []
//data hierarchy
class AlterTableV2 extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e, actionTitle){
		var newData = this.state.data;
		let myNewValue = 0;
		
		if(actionTitle === 'plus'){
			for(var i in newData){
				if(newData[i].data.id === e.data.id){
					newData[i].data.value += 5;
					myNewValue = newData[i].data.value;
				}
			}	
		}else{
			for(var i in newData){
				if(newData[i].data.id === e.data.id){
					newData[i].data.value -= (newData[i].data.value === 5) ? 0 : 5;
					myNewValue = newData[i].data.value;
				}
			}	
		}
		
		//var newValue = this.state.data[e.data.id].data.value;

		this.props.handler(e.data.id, actionTitle, myNewValue);
		this.setState({
			data: newData
		})
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
		    <div className='fixed h-[80vh] overflow-y-scroll right-[0%] top-[5%] w-2/4 pl-[10%] text-black'>
		    	{
		    		this.state.data.map((item) => {
		    					return (
		    						<div >
		    							<span className="text-green-300">{item.data.value}</span>
		    							<li className="rounded-lg border-black border-2 list-none mb-4 min-w-fit w-[40%] hover:bg-zinc-300">
		    			
		    							<span>{item.data.name}</span>
		    								<span onClick={e => this.handleClick(item, 'minus')} className="float-right text-lg text-center w-[20px] mr-[10px] hover:bg-zinc-500">-</span>
		    								<span onClick={e => this.handleClick(item, 'plus')} className="float-right text-lg text-center w-[20px]  hover:bg-zinc-500">+</span>
		    							</li>
		    						</div>
		    						)
		    		})
		    	}
		    </div>
		  );
	}
}

export default AlterTableV2;