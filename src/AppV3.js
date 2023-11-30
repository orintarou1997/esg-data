import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTableV2 from './components/AlterTableV2';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppV3 extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
		}

		this.handler = this.handler.bind(this)
	}

	handler(id){	
		var newData = this.state.data;
		newData[id].value -= 5;
		console.log(newData);
		this.setState({
			data: newData
		})
	}

	render(){
	  return (
	  	<div>
	      <BubbleChart data={this.state.data}/>
	      <AlterTableV2 handler={this.handler} data={this.state.data}/>
	    </div>
	  );
	}
}

export default AppV3;