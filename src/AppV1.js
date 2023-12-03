 import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTable from './components/AlterTable';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppV1 extends Component {
	render(){
	  return (
	      <BubbleChart data={this.props.data} version={1}/>
	  );
	}
}

export default AppV1;