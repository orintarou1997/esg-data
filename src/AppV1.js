import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTable from './components/AlterTable';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppV1 extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data
		}
	}

	render(){
	  return (
	      <BubbleChart data={this.state.data} version={1}/>
	  );
	}
}

export default AppV1;