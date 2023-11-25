import logo from './logo.svg';
import './App.css';
import AppV1 from './AppV1';
import AlterTable from './components/AlterTable';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppV2 extends Component {


	render(){
	  return (
	  	<div>
	  	<AppV1/>	  	
        <AlterTable id="table" data={myNewData}/>
	  	</div>
	  );
	}
}

export default AppV2;