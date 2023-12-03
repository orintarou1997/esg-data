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
			data: [],
		}

		this.handler = this.handler.bind(this);
	}

	handler(id, action, value){	
		this.setState({
			data: []
		})
	}

	render(){
	  return (
	  	<div>
	      <BubbleChart data={this.props.data}/>
	      <AlterTableV2 handler={this.handler} data={this.props.data}/>
	    </div>
	  );
	}
}

export default AppV3;